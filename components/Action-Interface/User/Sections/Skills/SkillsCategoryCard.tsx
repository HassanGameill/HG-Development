import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "next-intl";
import { useState } from "react";
import { TSkills, TSkillsItem } from "@/types/skillsType";
import SkillItem from "./SkillsItem";
import Image from "next/image";

interface SkillCategoryCardProps {
  category: TSkills;
  index: number;
}

export default function SkillCategoryCard({
  category,
  index,
}: SkillCategoryCardProps) {
  const locale = useLocale();
  const [hovered, setHovered] = useState<string | null>(null);

  // Default colors if missing
  const bgColor = category.bgColor || "from-gray-100 to-gray-200"; // card background
  const color = category.color || "from-blue-500 to-blue-700"; // progress bar / icon

  return (
    <Card
      className={`bg-gradient-to-br ${bgColor} border-none shadow-lg`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <CardHeader>
        <div className="flex items-center gap-4">
          {/* Category Icon */}
          <div
            className={`w-14 h-14  rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}
          >
            <Image
              src={category.imageUrl}
              alt={category.nameEn}
              width={124}
              height={124}
              className="w-10 h-10  object-cover"
            />
          </div>

          {/* Category Title */}
          <div className="flex flex-col">
            <CardTitle>
              {locale === "ar" ? category.nameAr : category.nameEn}
            </CardTitle>
            <CardDescription>
              {" "}
              <p className="mt-1 text-xs">
                {locale === "ar" ? category.titleAr : category.titleEn}
              </p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {category.skillsItem.map((skill: TSkillsItem, i: number) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            color={color} // safe default color
            delay={index * 200 + i * 100}
            hovered={hovered === skill.name}
            onHover={() => setHovered(skill.name)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
