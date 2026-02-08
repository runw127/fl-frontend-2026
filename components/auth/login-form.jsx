"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';

const schema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});
import { useMediaQuery } from "@/hooks/use-media-query";

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "demo@bloodcounts.org",
      password: "password",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data) => {
    startTransition(async () => {
      let response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
        window.location.assign("/project");
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };

  const logoVariants = {
    hidden: { pathLength: 0, fill: 'rgba(239, 46, 50, 0)' },
    visible: {
      pathLength: 1,
      transition: {
        duration: 4,  // Slowing down the drawing
        ease: 'easeInOut',
      },
    },
    fill: {
      fill: 'rgba(239, 46, 50, 1)',  // Filling with the red color
      transition: {
        duration: 1,  // The fill color transition
        delay: 2,     // Starts after the drawing is done
      },
    },
  };

  const textVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 2,  // The text animation starts after the drawing and fill
      },
    },
  };

  return (
    <div className="w-full py-10">

     
<motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="500"
      height="154"
      viewBox="0 -10 511.761 180"
      initial="hidden"

      animate="visible"
    >
      <g transform="translate(-43.894 -75.85)">
        {/* Drawing animation for the logo paths */}
        <motion.path
          d="M125.843 75.849s-15.13 23.32-28 50.395l17.304-7.138a11.038 11.038 0 0 1-.245-2.31c0-6.078 4.926-11.005 11.003-11.005 6.078 0 11.004 4.927 11.004 11.004a10.973 10.973 0 0 1-.724 3.928l20.96 12.699c-13.42-29.987-31.302-57.573-31.302-57.573Zm31.302 57.573a299.533 299.533 0 0 1 2.708 6.24l27.861 16.88-.007.018-23.084-4.662a187.042 187.042 0 0 1 1.479 4.312l20.793 4.2c-.003.106-.008.213-.008.32 0 .109.005.216.008.324l-18.25 3.685a118.406 118.406 0 0 1 .94 3.822l18.122-3.66.008.02-16.855 10.212a71.92 71.92 0 0 1 .532 4.276l18.45-11.178a10.971 10.971 0 0 0 8.049 3.504c6.076 0 11.003-4.927 11.003-11.004 0-6.078-4.927-11.004-11.003-11.004-3.179 0-6.04 1.349-8.05 3.504zm13.715 41.71a94.369 94.369 0 0 0-1.275-6.57l-32.681 6.6c.001.071.005.142.005.214 0 6.078-4.926 11.005-11.003 11.005-5.5 0-10.056-4.034-10.873-9.304l-34.366-.84a64.199 64.199 0 0 0-.586 6.26l36.69 16.033a10.994 10.994 0 0 1 9.135-4.867c3.28 0 6.223 1.437 8.239 3.713zm-90.78 7.365-14.219-6.213a11.075 11.075 0 0 0 .028-.409l14.778.362a83.759 83.759 0 0 1 .646-3.919l-15.966-.39-.07-.208 17.732-6.88a148.953 148.953 0 0 1 2.451-8.275l-19.803-8.168c.024-.115.045-.23.066-.345h22.745a233.773 233.773 0 0 1 1.527-3.933H65.723a9.988 9.988 0 0 0-.066-.344l29.735-12.265a348.623 348.623 0 0 1 2.451-5.266L64.155 140.14a10.993 10.993 0 0 0-9.257-5.059c-6.077 0-11.004 4.927-11.004 11.005 0 6.077 4.927 11.003 11.004 11.003 3.886 0 7.3-2.016 9.257-5.058l19.87 8.196-20.728 8.044a10.978 10.978 0 0 0-8.4-3.899c-6.076 0-11.003 4.926-11.003 11.004 0 6.078 4.927 11.004 11.004 11.004 4.377 0 8.156-2.555 9.929-6.255l15.261 6.668c1.153 24.273 21.195 43.6 45.755 43.6 25.3 0 45.81-20.51 45.81-45.808 0-1.665-.094-3.395-.26-5.176l-35.208 21.33a10.972 10.972 0 0 1 .724 3.927c0 6.078-4.926 11.005-11.003 11.005-6.078 0-11.004-4.927-11.004-11.005 0-.871.104-1.718.296-2.531l-35.109-15.342a46.166 46.166 0 0 1-.056-2.208c0-.685.02-1.383.048-2.088zm15.312-50.987a288.996 288.996 0 0 0-5.397 12.609h25.085c.929-5.138 5.42-9.037 10.826-9.037 6.077 0 11.004 4.927 11.004 11.004 0 .072-.004.143-.006.215l27.719 5.598a236.939 236.939 0 0 0-4.77-12.237l-25.708-15.576a10.975 10.975 0 0 1-8.24 3.713 10.993 10.993 0 0 1-9.256-5.058zm-6.924 16.542a195.814 195.814 0 0 0-3.007 8.514l3.879 1.6 26.062-10.114zm-7.155 24.266 34.042.833-26.06-10.75-6.285 2.439a108.926 108.926 0 0 0-1.697 7.478zm87.332-7.579c-.737-2.79-1.592-5.64-2.543-8.53l-29.973-6.052c-1.619 4.061-5.584 6.933-10.223 6.933-3.97 0-7.447-2.103-9.383-5.254l-21.914 8.503 22.04 9.092a10.992 10.992 0 0 1 9.256-5.059c4.64 0 8.605 2.872 10.223 6.934z"
          fill="none"
          stroke="#ef2e32"
          strokeWidth="3"
          variants={logoVariants}
          initial="hidden"
          animate={["visible", "fill"]}
        />
        {/* Fly-in animation for the text */}
        <motion.text
          y="178.781"
          x="215.879"
          style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 30 }}
          fontSize="54.857"
          fill="#ef2e32"
          strokeWidth="3.661"
          strokeLinejoin="bevel"
          variants={textVariants}
        >
          BloodCounts!
        </motion.text>
      </g>
    </motion.svg>
  
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="email" className="mb-2 font-medium text-default-600">
            Email{" "}
          </Label>
          <Input
            disabled={isPending}
            {...register("email")}
            type="email"
            id="email"
            className={cn("", {
              "border-destructive": errors.email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        {errors.email && (
          <div className=" text-destructive mt-2">{errors.email.message}</div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password{" "}
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer "
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <Button
          className="mt-5 w-full"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;
