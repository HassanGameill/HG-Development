import Image from "next/image";
import avatarIcon from "@/public/icons/user.png";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ProfileInfoProps = {
  avatar: string | null;
  user: any;
};

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileInfo: React.FC<ProfileInfoProps> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loading, setLoading] = useState(false);

  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const imageHandler = (e: any) => {
    const file = e.target.files?.[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
  }, [isSuccess, error, success, updateError]);

  const imageSrc = user?.avatar?.url || avatar || avatarIcon;

  const onSubmit = async (data: ProfileFormValues) => {
    if (!data.name.trim()) return;

    try {
      setLoading(true);
      await editProfile({
        name: data.name.trim(),
        email: data.email,
      }).unwrap(); // if you're using RTK Query

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full  space-y-8">
        {/* Avatar */}
        <div className="relative group w-fit mx-auto">
          <label htmlFor="avatar" className="cursor-pointer block relative">
            <Image
              src={imageSrc}
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full border-[3px] border-primary object-cover"
            />

            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera className="text-white w-6 h-6" />
            </div>
          </label>

          <input
            type="file"
            id="avatar"
            className="hidden"
            accept="image/png,image/jpg,image/jpeg,image/webp"
            onChange={imageHandler}
          />
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={loading || !form.formState.isDirty}
              className="px-6 py-2 rounded-md bg-primary text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileInfo;
