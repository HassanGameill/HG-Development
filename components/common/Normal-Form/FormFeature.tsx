import { Control, useController, FieldValues, Path } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

interface HeroFlagsForm {
  isFeatured?: boolean;
  isArchived?: boolean;
}

type Props<T extends FieldValues> = {
  control: Control<T>;
  primaryColor?: string; // pass Tailwind color like 'blue-500'
};

export function FormFeature<T extends HeroFlagsForm & FieldValues>({
  control,
  primaryColor = "primary", // default primary color
}: Props<T>) {
  const { field: featuredField } = useController({
    control,
    name: "isFeatured" as Path<T>,
  });
  const { field: archivedField } = useController({
    control,
    name: "isArchived" as Path<T>,
  });

  const FLAGS = [
    {
      field: featuredField,
      label: "Featured",
      desc: "Show on home page",
    },
    {
      field: archivedField,
      label: "Hidden",
      desc: "Hide from public pages",
    },
  ];

  return (
    <section className="rounded-xl p-4 border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Visibility & Status
      </h3>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
        {FLAGS.map(({ field, label, desc }) => {
          const isActive = field.value;
          return (
            <button
              key={label}
              type="button"
              onClick={() => field.onChange(!field.value)}
              className={`
                flex-1 flex items-center gap-3 p-4 rounded-lg border transition-all
                focus:outline-none focus:ring-${primaryColor}
                ${
                  isActive
                    ? `bg-${primaryColor} text-white  dark:bg-${primaryColor} dark:text-white `
                    : `bg-white text-gray-900  hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300  dark:hover:bg-gray-600`
                }
              `}
            >
              <div
                className={`
                  flex-shrink-0 w-5 h-5 border rounded-sm flex items-center justify-center transition-all
                  ${isActive
                    ? `bg-white text-${primaryColor} dark:bg-black dark:text-${primaryColor}`
                    : ""
                  }
                `}
              >
                {isActive && <FaCheck className="w-3 h-3" />}
              </div>
              <div className="text-left">
                <div className="font-medium">{label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
