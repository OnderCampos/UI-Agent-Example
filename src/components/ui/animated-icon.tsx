"use client";

import { motion, } from "motion/react";
import { type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

// Animation presets
export const iconAnimations = {
  // Pulse animation - great for notifications, alerts
  pulse: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.15, 1] },
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1 },
  },
  // Bounce animation - great for buttons, CTAs
  bounce: {
    initial: { y: 0 },
    animate: { y: [0, -4, 0] },
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
  },
  // Spin animation - great for loading, refresh
  spin: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
  // Shake animation - great for errors, warnings
  shake: {
    initial: { x: 0 },
    animate: { x: [-2, 2, -2, 2, 0] },
    transition: { duration: 0.4, repeat: Infinity, repeatDelay: 2 },
  },
  // Pop animation - great for success, adding items
  pop: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 0.9, 1.05, 1] },
    transition: { duration: 0.5 },
  },
  // Swing animation - great for notifications
  swing: {
    initial: { rotate: 0 },
    animate: { rotate: [0, 15, -15, 10, -10, 5, -5, 0] },
    transition: { duration: 0.8 },
  },
  // Float animation - subtle floating effect
  float: {
    initial: { y: 0 },
    animate: { y: [-2, 2, -2] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  // Heartbeat animation - great for likes, favorites
  heartbeat: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.1, 1, 1.1, 1] },
    transition: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5 },
  },
  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  // Scale in animation
  scaleIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3, type: "spring", stiffness: 200 },
  },
  // Slide in from left
  slideInLeft: {
    initial: { x: -10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
  // None - no animation
  none: {
    initial: {},
    animate: {},
    transition: {},
  },
} as const;

// Hover animation presets
export const hoverAnimations = {
  // Scale up on hover
  scale: {
    scale: 1.15,
    transition: { duration: 0.2 },
  },
  // Rotate on hover
  rotate: {
    rotate: 15,
    transition: { duration: 0.2 },
  },
  // Lift up on hover
  lift: {
    y: -3,
    transition: { duration: 0.2 },
  },
  // Glow effect (scale + brightness)
  glow: {
    scale: 1.1,
    filter: "brightness(1.2)",
    transition: { duration: 0.2 },
  },
  // Bounce on hover
  bounce: {
    scale: [1, 1.2, 1.1],
    transition: { duration: 0.3 },
  },
  // Spin on hover
  spin: {
    rotate: 360,
    transition: { duration: 0.5 },
  },
  // Shake on hover
  shake: {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.3 },
  },
  // None
  none: {},
} as const;

// Tap animation presets
export const tapAnimations = {
  // Press down
  press: {
    scale: 0.9,
  },
  // Squish
  squish: {
    scale: 0.85,
    y: 2,
  },
  // Pop
  pop: {
    scale: 1.1,
  },
  // None
  none: {},
} as const;

export type AnimationType = keyof typeof iconAnimations;
export type HoverType = keyof typeof hoverAnimations;
export type TapType = keyof typeof tapAnimations;

interface AnimatedIconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  animation?: AnimationType;
  hoverAnimation?: HoverType;
  tapAnimation?: TapType;
  animateOnHover?: boolean;
  continuous?: boolean;
  delay?: number;
  className?: string;
}

export const AnimatedIcon = forwardRef<SVGSVGElement, AnimatedIconProps>(
  (
    {
      icon: Icon,
      animation = "none",
      hoverAnimation = "scale",
      tapAnimation = "press",
      animateOnHover = true,
      continuous = false,
      delay = 0,
      className,
      ...props
    },
    ref
  ) => {
    const animationConfig = iconAnimations[animation];
    const hoverConfig = animateOnHover ? hoverAnimations[hoverAnimation] : {};
    const tapConfig = tapAnimations[tapAnimation];

    return (
      <motion.div
        className={cn("inline-flex items-center justify-center", className)}
        initial={animationConfig.initial}
        animate={continuous || animation !== "none" ? animationConfig.animate : undefined}
        transition={{
          ...animationConfig.transition,
          delay,
        }}
        whileHover={hoverConfig}
        whileTap={tapConfig}
      >
        <Icon ref={ref} {...props} />
      </motion.div>
    );
  }
);

AnimatedIcon.displayName = "AnimatedIcon";

// Pre-configured animated icons for common use cases
export const AnimatedCartIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon" | "animation">>(
  (props, ref) => {
    const { ShoppingCart } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={ShoppingCart} hoverAnimation="bounce" {...props} />;
  }
);
AnimatedCartIcon.displayName = "AnimatedCartIcon";

export const AnimatedHeartIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon">>(
  (props, ref) => {
    const { Heart } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Heart} animation="heartbeat" continuous hoverAnimation="scale" {...props} />;
  }
);
AnimatedHeartIcon.displayName = "AnimatedHeartIcon";

export const AnimatedBellIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon">>(
  (props, ref) => {
    const { Bell } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Bell} hoverAnimation="shake" {...props} />;
  }
);
AnimatedBellIcon.displayName = "AnimatedBellIcon";

export const AnimatedLoaderIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon" | "animation">>(
  (props, ref) => {
    const { Loader2 } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Loader2} animation="spin" continuous {...props} />;
  }
);
AnimatedLoaderIcon.displayName = "AnimatedLoaderIcon";

export const AnimatedCheckIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon" | "animation">>(
  (props, ref) => {
    const { Check } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Check} animation="scaleIn" {...props} />;
  }
);
AnimatedCheckIcon.displayName = "AnimatedCheckIcon";

export const AnimatedStarIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon">>(
  (props, ref) => {
    const { Star } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Star} hoverAnimation="spin" {...props} />;
  }
);
AnimatedStarIcon.displayName = "AnimatedStarIcon";

export const AnimatedSearchIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon">>(
  (props, ref) => {
    const { Search } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Search} hoverAnimation="scale" {...props} />;
  }
);
AnimatedSearchIcon.displayName = "AnimatedSearchIcon";

export const AnimatedMenuIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon">>(
  (props, ref) => {
    const { Menu } = require("lucide-react");
    return <AnimatedIcon ref={ref} icon={Menu} hoverAnimation="rotate" {...props} />;
  }
);
AnimatedMenuIcon.displayName = "AnimatedMenuIcon";

export const AnimatedArrowIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon"> & { direction?: "left" | "right" | "up" | "down" }>(
  ({ direction = "right", ...props }, ref) => {
    const icons = {
      left: require("lucide-react").ArrowLeft,
      right: require("lucide-react").ArrowRight,
      up: require("lucide-react").ArrowUp,
      down: require("lucide-react").ArrowDown,
    };
    return <AnimatedIcon ref={ref} icon={icons[direction]} hoverAnimation="lift" {...props} />;
  }
);
AnimatedArrowIcon.displayName = "AnimatedArrowIcon";

export const AnimatedChevronIcon = forwardRef<SVGSVGElement, Omit<AnimatedIconProps, "icon"> & { direction?: "left" | "right" | "up" | "down" }>(
  ({ direction = "right", ...props }, ref) => {
    const icons = {
      left: require("lucide-react").ChevronLeft,
      right: require("lucide-react").ChevronRight,
      up: require("lucide-react").ChevronUp,
      down: require("lucide-react").ChevronDown,
    };
    return <AnimatedIcon ref={ref} icon={icons[direction]} hoverAnimation="lift" {...props} />;
  }
);
AnimatedChevronIcon.displayName = "AnimatedChevronIcon";
