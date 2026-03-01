"use client";
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useTheme } from "next-themes";
import { TExperience } from "@/types/experienceType";

interface HistoryCardTwoProps {
  experience: TExperience[];
}

const ExperienceCard = ({ experience }: HistoryCardTwoProps) => {
  const locale = useLocale();
  const [visibleMilestones, setVisibleMilestones] = useState(false);
  const isArabic = locale === "ar";
  const { theme } = useTheme();

  useEffect(() => {
    setVisibleMilestones(true);
  }, []);

  return (
    <div id="experience" className=" relative" dir={isArabic ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-6xl">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className={`hidden lg:block absolute ${
              isArabic ? "right-8" : "left-8"
            } top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-800 via-purple-500 to-red-700`}
          ></div>

          <div className="space-y-12">
            {experience.map((milestone, index) => {
              return (
                <div
                  key={milestone.id}
                  className={`relative ${
                    isArabic ? "lg:pr-20" : "lg:pl-20"
                  } transform transition-all duration-700 ${
                    visibleMilestones
                      ? "translate-x-0 opacity-100"
                      : isArabic
                        ? "translate-x-20 opacity-0"
                        : "-translate-x-20 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  {/* Logo Point */}
                  <div
                    className={`absolute ${
                      isArabic ? "right-3" : "left-3"
                    } top-3 w-10 h-10 rounded-full 
                      shadow-sm sm:shadow-lg flex items-center justify-center
                      bg-white dark:bg-slate-800 p-1
                      border-[3px] border-gray-300 transition-all duration-300`}
                  >
                    <Image
                      src={milestone.imageUrl}
                      alt="logo"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="w-full"
                    />
                  </div>

                  {/* Card */}
                  <Card
                    className={`
    relative overflow-hidden rounded-2xl p-2 lg:p-7
    transition-all duration-300 ease-out
    hover:-translate-y-1 hover:shadow-2xl
    group
    ${
      milestone.isCurrent
        ? "border border-orange-500/40 bg-gradient-to-br from-orange-50/60 to-transparent dark:from-orange-900/20 dark:border-orange-400/40"
        : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
    }
  `}
                  >
                    {/* Soft hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none" />

                    <CardHeader className="relative z-10 pb-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Title + Label */}
                        <div className="space-y-2">
                          <CardTitle className="text-2xl flex items-center gap-4 font-semibold tracking-tight text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors">
                            <div
                              className={` ${
                                isArabic ? "right-3" : "left-3"
                              } top-3 w-10 h-10 lg:w-16 lg:h-16 rounded-xl
                      shadow-sm sm:shadow-sm flex items-center justify-center
                      bg-white dark:bg-slate-800 p-1
                      border-[2px] border-gray-300 transition-all duration-300`}
                            >
                              <Image
                                src={milestone.imageUrl}
                                alt="logo"
                                width={40}
                                height={40}
                                loading="lazy"
                                className="w-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1 text-shadow-sm">
                              <span className="text-xs lg:text-sm text-red-800 dark:text-blue-400">
                                {milestone.companyName}
                              </span>
                              <span className="text-sm lg:text-lg">{milestone.title}</span>
                              
                            </div>
                          </CardTitle>

                          {milestone.isCurrent && (
                            <Badge className="bg-orange-500/10 text-red-800 dark:text-red-700 border border-orange-400/30 font-medium px-3 py-1">
                              {isArabic ? "المحطة الحالية" : "Current Position"}
                            </Badge>
                          )}
                        </div>

                        {/* Period */}
                        {milestone.startPeriod && (
                          <div
                            className={`
      inline-flex items-center gap-2 
      bg-slate-100 dark:bg-slate-800 
      text-slate-700 dark:text-slate-300 
      px-4 py-1.5 text-xs font-medium 
      rounded-full
      ${isArabic ? "flex-row-reverse" : ""}
    `}
                          >
                            <span>{milestone.startPeriod}</span>

                            <span className="text-slate-400">|—|</span>

                            <span>
                              {milestone.isCurrent
                                ? isArabic
                                  ? "حتى الآن"
                                  : "Present"
                                : milestone.endPeriod}
                            </span>
                          </div>
                        )}
                      </div>

                      {milestone.subtitle && (
                        <div dir="ltr" className="pt-4 border-t ext-shadow-xs border-slate-200 dark:border-slate-700">
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {milestone.subtitle}
                          </p>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent
                      className={`
      relative z-10 space-y-6
      ${isArabic ? "text-right" : "text-left"}
    `}
                    >
                      {/* Achievements Section */}
                      {milestone.experienceAchievement?.length > 0 && (
                        <div className="space-y-4" >
                          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {isArabic ? "أبرز الإنجازات" : "Key Achievements"}
                          </h4>

                          <div className="space-y-4 text-shadow-xs" >
                            {milestone.experienceAchievement.map(
                              (achievement, i) => (
                                <div key={i} className="group/achievement">
                                  <div
                                    className={`flex items-start gap-3 ${
                                      isArabic ? "flex-row-reverse" : ""
                                    }`}
                                  >
                                    {/* Dot */}
                                    <div className="relative mt-2">
                                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full group-hover/achievement:scale-125 transition-transform duration-200" />
                                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 scale-150" />
                                    </div>

                                    {/* Text */}
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover/achievement:text-slate-900 dark:group-hover/achievement:text-white transition-colors">
                                        {achievement.title}
                                      </p>

                                      {achievement.subtitle && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                          {achievement.subtitle}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      {/* {milestone.subtitle && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {milestone.subtitle}
                          </p>
                        </div>
                      )} */}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
