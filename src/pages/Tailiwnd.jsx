import React, { useState, useEffect } from 'react';
import { database } from "../../firebase"; // Adjust the path based on your project structure
import { ref, push } from "firebase/database";

/* ---------------------------
   Global Tailwind Classes
---------------------------- */
const tailwindClasses = [
  "flex", "grid", "justify-center", "justify-end", "justify-between", "items-center",
  "gap-4", "p-4", "p-8", "p-6", "m-4", "m-6", "m-8",
  "text-xl", "text-2xl", "text-3xl", "font-bold", "bg-blue-500", "bg-green-500",
  "bg-red-500", "bg-yellow-500", "bg-purple-500", "border", "border-2", "border-4",
  "border-8", "border-red-500", "border-blue-500", "border-green-500", "border-yellow-500",
  "border-purple-500", "border-dashed", "border-double", "shadow-sm", "shadow-md",
  "shadow-lg", "rounded", "rounded-lg", "rounded-full", "transition-all", "duration-500",
  "sm:text-sm", "md:text-lg", "lg:text-xl", "grid-cols-2", "grid-cols-3", "hover:bg-blue-500",
  "hover:scale-105", "transform", "transition-transform", "duration-300", "opacity-50",
  "hover:opacity-100", "flex-wrap", "text-red-500", "text-blue-500", "w-32", "h-32",
  "relative", "absolute", "inset-0", "italic", "underline", "uppercase"
];

/* ---------------------------
   Class Descriptions Mapping
   (Descriptions in Hinglish)
---------------------------- */
const classDescriptions = {
  "flex": "flex se container flexbox ban jata hai. Example: Items ek row mein aate hain.",
  "grid": "grid se container ko grid layout banate hain. Example: Items columns aur rows mein set hote hain.",
  "justify-center": "justify-center se flex items horizontal center mein align hote hain.",
  "justify-end": "justify-end se flex items right side par align ho jate hain.",
  "justify-between": "justify-between se items ke beech equal gap milta hai.",
  "items-center": "items-center se flex items vertically center ho jate hain.",
  "gap-4": "gap-4 se items ke beech 1rem (16px) gap add hota hai.",
  "p-4": "p-4 se element ke andar 1rem padding add hoti hai.",
  "p-8": "p-8 se element ke andar 2rem padding add hoti hai.",
  "p-6": "p-6 se element ke andar 1.5rem padding add hoti hai.",
  "m-4": "m-4 se element ke bahar 1rem margin add hota hai.",
  "m-6": "m-6 se element ke bahar 1.5rem margin add hota hai.",
  "m-8": "m-8 se element ke bahar 2rem margin add hota hai.",
  "text-xl": "text-xl se text ka size 1.25rem hota hai.",
  "text-2xl": "text-2xl se text ka size 1.5rem hota hai.",
  "text-3xl": "text-3xl se text ka size 1.875rem hota hai.",
  "text-xs": "Bahut chhota font size lagata hai.",
  "text-sm": "Chhota font size lagata hai.",
  "text-base": "Default font size lagata hai.",
  "text-lg": "Bada font size lagata hai.",
  "font-thin": "Bahut patla font weight lagata hai.",
  "font-light": "Halka font weight lagata hai.",
  "font-medium": "Thoda mota font weight lagata hai.",
  "font-semibold": "Aur jyada mota font weight lagata hai.",
  "font-bold": "Mota font weight lagata hai.",
  "bg-blue-500": "bg-blue-500 se element ka background blue ho jata hai.",
  "bg-green-500": "bg-green-500 se background green ho jata hai.",
  "bg-red-500": "bg-red-500 se background red ho jata hai.",
  "bg-yellow-500": "bg-yellow-500 se background yellow ho jata hai.",
  "bg-purple-500": "bg-purple-500 se background purple ho jata hai.",
  "border": "border se element ke around default border lag jata hai.",
  "border-2": "border-2 se element ke around 2px border lagta hai.",
  "border-4": "border-4 se element ke around 4px border lagta hai.",
  "border-8": "border-8 se element ke around 8px border lagta hai.",
  "border-red-500": "border-red-500 se element ka border red ho jata hai.",
  "border-blue-500": "border-blue-500 se border blue ho jata hai.",
  "border-green-500": "border-green-500 se border green ho jata hai.",
  "border-yellow-500": "border-yellow-500 se border yellow ho jata hai.",
  "border-purple-500": "border-purple-500 se border purple ho jata hai.",
  "border-dashed": "border-dashed se border dashed style ka ho jata hai.",
  "border-double": "border-double se border double line style ka ho jata hai.",
  "shadow-sm": "shadow-sm se halka shadow add hota hai.",
  "shadow-md": "shadow-md se medium shadow effect hota hai.",
  "shadow-lg": "shadow-lg se bada shadow effect hota hai.",
  "rounded": "rounded se element ke corners round ho jate hain.",
  "rounded-lg": "rounded-lg se corners thode zyada round ho jate hain.",
  "rounded-full": "rounded-full se element completely circular ho jata hai.",
  "transition-all": "transition-all se sabhi changes smooth transition ke sath hote hain.",
  "duration-500": "duration-500 se transition 500ms ka hota hai.",
  "sm:text-sm": "sm:text-sm se small screens pe text size chhota ho jata hai.",
  "md:text-lg": "md:text-lg se medium screens pe text size bada ho jata hai.",
  "lg:text-xl": "lg:text-xl se large screens pe text aur bada ho jata hai.",
  "grid-cols-2": "grid-cols-2 se grid mein 2 columns bante hain.",
  "grid-cols-3": "grid-cols-3 se grid mein 3 columns bante hain.",
  "hover:bg-blue-500": "hover:bg-blue-500 se mouse hover pe background blue ho jata hai.",
  "hover:scale-105": "hover:scale-105 se mouse hover pe element 105% scale ho jata hai.",
  "transform": "transform se element ko rotate, scale, etc. kar sakte hain.",
  "transition-transform": "transition-transform se transform changes smooth hote hain.",
  "duration-300": "duration-300 se transition 300ms ka hota hai.",
  "opacity-50": "opacity-50 se element 50% transparent ho jata hai.",
  "hover:opacity-100": "hover:opacity-100 se hover pe element fully opaque ho jata hai.",
  "flex-wrap": "flex-wrap se flex container ke items wrap ho jate hain jab space kam ho.",
  "underline": "underline se text underline ho jata hai.",
  "uppercase": "uppercase se text uppercase ho jata hai.",

  // ─── ADDITIONAL 200 ENTRIES ──────────────────────────────────────────────

  "text-4xl": "text-4xl se text ka size 2.25rem hota hai. Bahut bada text.",
  "text-5xl": "text-5xl se text ka size 3rem hota hai. Extra bada text.",
  "text-6xl": "text-6xl se text ka size 3.75rem hota hai.",
  "text-7xl": "text-7xl se text ka size 4.5rem hota hai.",
  "text-8xl": "text-8xl se text ka size 6rem hota hai.",
  "text-9xl": "text-9xl se text ka size 8rem hota hai.",
  "tracking-tighter": "tracking-tighter se letter spacing bahut kam ho jata hai.",
  "tracking-tight": "tracking-tight se letter spacing kam ho jata hai.",
  "tracking-normal": "tracking-normal se letter spacing normal hota hai.",
  "tracking-wide": "tracking-wide se letter spacing thoda zyada hota hai.",
  "tracking-wider": "tracking-wider se letter spacing aur zyada ho jata hai.",
  "tracking-widest": "tracking-widest se letter spacing sabse zyada ho jata hai.",
  "leading-none": "leading-none se line-height bilkul zero hota hai.",
  "leading-tight": "leading-tight se line-height kam hota hai.",
  "leading-snug": "leading-snug se thoda snug line-height hota hai.",
  "leading-normal": "leading-normal se line-height normal hota hai.",
  "leading-relaxed": "leading-relaxed se line-height relaxed hota hai.",
  "leading-loose": "leading-loose se line-height bahut loose hota hai.",
  "font-extralight": "font-extralight se font weight bahut halka hota hai.",
  "font-extrabold": "font-extrabold se font weight bahut mota hota hai.",
  "font-black": "font-black se font weight sabse heavy hota hai.",
  "bg-gradient-to-r": "bg-gradient-to-r se background right direction me gradient hota hai.",
  "bg-gradient-to-l": "bg-gradient-to-l se background left direction me gradient hota hai.",
  "bg-gradient-to-t": "bg-gradient-to-t se background top direction me gradient hota hai.",
  "bg-gradient-to-b": "bg-gradient-to-b se background bottom direction me gradient hota hai.",
  "from-blue-400": "from-blue-400 se gradient ki shuruat blue shade se hoti hai.",
  "from-green-400": "from-green-400 se gradient ki shuruat green shade se hoti hai.",
  "from-red-400": "from-red-400 se gradient ki shuruat red shade se hoti hai.",
  "from-yellow-400": "from-yellow-400 se gradient ki shuruat yellow shade se hoti hai.",
  "from-purple-400": "from-purple-400 se gradient ki shuruat purple shade se hoti hai.",
  "to-blue-400": "to-blue-400 se gradient ka ant blue shade se hota hai.",
  "to-green-400": "to-green-400 se gradient ka ant green shade se hota hai.",
  "to-red-400": "to-red-400 se gradient ka ant red shade se hota hai.",
  "to-yellow-400": "to-yellow-400 se gradient ka ant yellow shade se hota hai.",
  "to-purple-400": "to-purple-400 se gradient ka ant purple shade se hota hai.",
  "border-t": "border-t se sirf top border lagta hai.",
  "border-r": "border-r se sirf right border lagta hai.",
  "border-b": "border-b se sirf bottom border lagta hai.",
  "border-l": "border-l se sirf left border lagta hai.",
  "border-solid": "border-solid se border solid style ka hota hai.",
  "border-dotted": "border-dotted se border dotted style ka hota hai.",
  "border-none": "border-none se border nahi dikhta.",
  "shadow-inner": "shadow-inner se element ke andar shadow lagta hai.",
  "shadow-outline": "shadow-outline se element ke around outline shadow lagta hai.",
  "opacity-75": "opacity-75 se element 75% opaque hota hai.",
  "hover:opacity-75": "hover:opacity-75 se hover karne par element 75% opaque hota hai.",
  "hover:underline": "hover:underline se hover par text underline ho jata hai.",
  "hover:cursor-pointer": "hover:cursor-pointer se hover par cursor pointer ban jata hai.",
  "transition-colors": "transition-colors se colors ka transition smooth hota hai.",
  "transition-opacity": "transition-opacity se opacity ka transition smooth hota hai.",
  "duration-200": "duration-200 se transition 200ms ka hota hai.",
  "duration-700": "duration-700 se transition 700ms ka hota hai.",
  "ease-linear": "ease-linear se transition linear hota hai.",
  "ease-in": "ease-in se transition start slow hota hai.",
  "ease-out": "ease-out se transition end slow hota hai.",
  "ease-in-out": "ease-in-out se transition dono taraf smooth hota hai.",
  "bg-fixed": "bg-fixed se background fixed rehta hai.",
  "bg-local": "bg-local se background local element se chalta hai.",
  "bg-scroll": "bg-scroll se background scroll karta hai.",
  "bg-no-repeat": "bg-no-repeat se background image repeat nahi hota.",
  "bg-repeat": "bg-repeat se background image repeat hota hai.",
  "bg-repeat-x": "bg-repeat-x se background image horizontally repeat hota hai.",
  "bg-repeat-y": "bg-repeat-y se background image vertically repeat hota hai.",
  "bg-repeat-round": "bg-repeat-round se background image round repeat hota hai.",
  "bg-repeat-space": "bg-repeat-space se background image space ke sath repeat hota hai.",
  "object-scale-down": "object-scale-down se image container me scale down hota hai.",
  "rounded-sm": "rounded-sm se element ke corners thoda chhote round hote hain.",
  "rounded-md": "rounded-md se element ke corners medium round hote hain.",
  "rounded-xl": "rounded-xl se element ke corners extra round hote hain.",
  "rounded-2xl": "rounded-2xl se element ke corners bahut round hote hain.",
  "rounded-3xl": "rounded-3xl se element ke corners sabse zyada round hote hain.",
  "ring": "ring se element ke around ek ring effect lagta hai.",
  "ring-1": "ring-1 se element ke around 1px ring lagta hai.",
  "ring-2": "ring-2 se element ke around 2px ring lagta hai.",
  "ring-4": "ring-4 se element ke around 4px ring lagta hai.",
  "ring-8": "ring-8 se element ke around 8px ring lagta hai.",
  "ring-offset-0": "ring-offset-0 se ring ka offset 0 hota hai.",
  "ring-offset-1": "ring-offset-1 se ring ka offset 1px hota hai.",
  "ring-offset-2": "ring-offset-2 se ring ka offset 2px hota hai.",
  "ring-offset-4": "ring-offset-4 se ring ka offset 4px hota hai.",
  "ring-offset-8": "ring-offset-8 se ring ka offset 8px hota hai.",
  "ring-blue-500": "ring-blue-500 se ring ka color blue hota hai.",
  "ring-green-500": "ring-green-500 se ring ka color green hota hai.",
  "ring-red-500": "ring-red-500 se ring ka color red hota hai.",
  "ring-yellow-500": "ring-yellow-500 se ring ka color yellow hota hai.",
  "ring-purple-500": "ring-purple-500 se ring ka color purple hota hai.",
  "ring-opacity-50": "ring-opacity-50 se ring 50% opaque hota hai.",
  "hover:ring-opacity-100": "hover:ring-opacity-100 se hover par ring fully opaque hota hai.",
  "hover:ring-offset-2": "hover:ring-offset-2 se hover par ring ka offset 2px hota hai.",
  "focus:ring": "focus:ring se focus par ring effect dikhta hai.",
  "focus:ring-2": "focus:ring-2 se focus par 2px ka ring lagta hai.",
  "focus:ring-offset-2": "focus:ring-offset-2 se focus par ring ka offset 2px hota hai.",
  "focus:ring-blue-500": "focus:ring-blue-500 se focus par ring ka color blue hota hai.",
  "focus:ring-green-500": "focus:ring-green-500 se focus par ring ka color green hota hai.",
  "focus:ring-red-500": "focus:ring-red-500 se focus par ring ka color red hota hai.",
  "focus:ring-yellow-500": "focus:ring-yellow-500 se focus par ring ka color yellow hota hai.",
  "hover:scale-110": "hover:scale-110 se hover par element 110% scale ho jata hai.",
  "hover:scale-95": "hover:scale-95 se hover par element 95% scale ho jata hai.",
  "scale-50": "scale-50 se element 50% size ka ho jata hai.",
  "scale-75": "scale-75 se element 75% size ka ho jata hai.",
  "scale-90": "scale-90 se element 90% size ka ho jata hai.",
  "scale-100": "scale-100 se element apne asli size par hota hai.",
  "scale-110": "scale-110 se element 110% size ka ho jata hai.",
  "scale-125": "scale-125 se element 125% size ka ho jata hai.",
  "scale-150": "scale-150 se element 150% size ka ho jata hai.",
  "rotate-0": "rotate-0 se element rotate nahi hota.",
  "rotate-3": "rotate-3 se element 3 degree rotate hota hai.",
  "rotate-6": "rotate-6 se element 6 degree rotate hota hai.",
  "rotate-12": "rotate-12 se element 12 degree rotate hota hai.",
  "rotate-45": "rotate-45 se element 45 degree rotate hota hai.",
  "rotate-90": "rotate-90 se element 90 degree rotate hota hai.",
  "rotate-180": "rotate-180 se element 180 degree rotate hota hai.",
  "skew-x-0": "skew-x-0 se element x-axis par skew nahi hota.",
  "skew-x-3": "skew-x-3 se element x-axis par 3 degree skew hota hai.",
  "skew-x-6": "skew-x-6 se element x-axis par 6 degree skew hota hai.",
  "skew-x-12": "skew-x-12 se element x-axis par 12 degree skew hota hai.",
  "skew-y-0": "skew-y-0 se element y-axis par skew nahi hota.",
  "skew-y-3": "skew-y-3 se element y-axis par 3 degree skew hota hai.",
  "skew-y-6": "skew-y-6 se element y-axis par 6 degree skew hota hai.",
  "skew-y-12": "skew-y-12 se element y-axis par 12 degree skew hota hai.",
  "translate-x-0": "translate-x-0 se element horizontally move nahi hota.",
  "translate-x-1": "translate-x-1 se element 0.25rem horizontally move hota hai.",
  "translate-x-2": "translate-x-2 se element 0.5rem horizontally move hota hai.",
  "translate-x-3": "translate-x-3 se element 0.75rem horizontally move hota hai.",
  "translate-x-4": "translate-x-4 se element 1rem horizontally move hota hai.",
  "translate-x-5": "translate-x-5 se element 1.25rem horizontally move hota hai.",
  "translate-x-6": "translate-x-6 se element 1.5rem horizontally move hota hai.",
  "translate-x-8": "translate-x-8 se element 2rem horizontally move hota hai.",
  "translate-x-10": "translate-x-10 se element 2.5rem horizontally move hota hai.",
  "translate-x-12": "translate-x-12 se element 3rem horizontally move hota hai.",
  "translate-x-16": "translate-x-16 se element 4rem horizontally move hota hai.",
  "translate-x-20": "translate-x-20 se element 5rem horizontally move hota hai.",
  "translate-x-24": "translate-x-24 se element 6rem horizontally move hota hai.",
  "translate-x-32": "translate-x-32 se element 8rem horizontally move hota hai.",
  "translate-x-40": "translate-x-40 se element 10rem horizontally move hota hai.",
  "translate-x-48": "translate-x-48 se element 12rem horizontally move hota hai.",
  "translate-x-56": "translate-x-56 se element 14rem horizontally move hota hai.",
  "translate-x-64": "translate-x-64 se element 16rem horizontally move hota hai.",
  "translate-y-0": "translate-y-0 se element vertically move nahi hota.",
  "translate-y-1": "translate-y-1 se element 0.25rem vertically move hota hai.",
  "translate-y-2": "translate-y-2 se element 0.5rem vertically move hota hai.",
  "translate-y-3": "translate-y-3 se element 0.75rem vertically move hota hai.",
  "translate-y-4": "translate-y-4 se element 1rem vertically move hota hai.",
  "translate-y-5": "translate-y-5 se element 1.25rem vertically move hota hai.",
  "translate-y-6": "translate-y-6 se element 1.5rem vertically move hota hai.",
  "translate-y-8": "translate-y-8 se element 2rem vertically move hota hai.",
  "translate-y-10": "translate-y-10 se element 2.5rem vertically move hota hai.",
  "translate-y-12": "translate-y-12 se element 3rem vertically move hota hai.",
  "translate-y-16": "translate-y-16 se element 4rem vertically move hota hai.",
  "translate-y-20": "translate-y-20 se element 5rem vertically move hota hai.",
  "translate-y-24": "translate-y-24 se element 6rem vertically move hota hai.",
  "translate-y-32": "translate-y-32 se element 8rem vertically move hota hai.",
  "translate-y-40": "translate-y-40 se element 10rem vertically move hota hai.",
  "translate-y-48": "translate-y-48 se element 12rem vertically move hota hai.",
  "translate-y-56": "translate-y-56 se element 14rem vertically move hota hai.",
  "translate-y-64": "translate-y-64 se element 16rem vertically move hota hai.",
  "inset-0": "inset-0 se element sabhi taraf 0 offset par hota hai.",
  "inset-y-0": "inset-y-0 se element vertically 0 offset par hota hai.",
  "inset-x-0": "inset-x-0 se element horizontally 0 offset par hota hai.",
  "top-0": "top-0 se element top 0 offset par hota hai.",
  "right-0": "right-0 se element right 0 offset par hota hai.",
  "bottom-0": "bottom-0 se element bottom 0 offset par hota hai.",
  "left-0": "left-0 se element left 0 offset par hota hai.",
  "z-0": "z-0 se element ka z-index 0 hota hai.",
  "z-10": "z-10 se element ka z-index 10 hota hai.",
  "z-20": "z-20 se element ka z-index 20 hota hai.",
  "z-30": "z-30 se element ka z-index 30 hota hai.",
  "z-40": "z-40 se element ka z-index 40 hota hai.",
  "z-50": "z-50 se element ka z-index 50 hota hai.",
  "overflow-visible": "overflow-visible se element ka content visible rehta hai.",
  "overflow-hidden": "overflow-hidden se element ka content chhupa rehta hai.",
  "overflow-scroll": "overflow-scroll se element ka content scrollable rehta hai.",
  "cursor-pointer": "cursor-pointer se cursor pointer icon ban jata hai.",
  "cursor-default": "cursor-default se cursor default icon hota hai.",
  "cursor-wait": "cursor-wait se cursor wait icon ban jata hai.",
  "cursor-text": "cursor-text se cursor text selection icon ban jata hai.",
  "cursor-move": "cursor-move se cursor move icon ban jata hai.",
  "cursor-not-allowed": "cursor-not-allowed se cursor not-allowed icon ban jata hai.",
  "select-none": "select-none se text select nahi hota.",
  "select-text": "select-text se text select ho jata hai.",
  "select-all": "select-all se pura text select ho jata hai.",
  "select-auto": "select-auto se browser default selection behavior hota hai.",
  "appearance-none": "appearance-none se element ki default appearance hat jati hai.",
  "pointer-events-none": "pointer-events-none se element par pointer events disable hote hain.",
  "pointer-events-auto": "pointer-events-auto se element par pointer events enable hote hain.",
  "bg-opacity-25": "bg-opacity-25 se background 25% opaque hota hai.",
  "bg-opacity-50": "bg-opacity-50 se background 50% opaque hota hai.",
  "bg-opacity-75": "bg-opacity-75 se background 75% opaque hota hai.",
  "bg-opacity-100": "bg-opacity-100 se background 100% opaque hota hai.",
  "text-opacity-25": "text-opacity-25 se text 25% opaque hota hai.",
  "text-opacity-50": "text-opacity-50 se text 50% opaque hota hai.",
  "text-opacity-75": "text-opacity-75 se text 75% opaque hota hai.",
  "text-opacity-100": "text-opacity-100 se text 100% opaque hota hai.",
  "border-opacity-50": "border-opacity-50 se border 50% opaque hota hai."
};


/* ---------------------------
   Speech Synthesis Function
---------------------------- */
function speakDescription(suggestion) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const description = classDescriptions[suggestion];
    if (description) {
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  }
}

/**
 * Helper function that toggles a CSS class in the given string.
 */
function toggleClass(prev, suggestion) {
  const tokens = prev.trim().split(/\s+/).filter(Boolean);
  if (tokens.includes(suggestion)) {
    return tokens.filter(token => token !== suggestion).join(" ") + (tokens.length > 1 ? " " : "");
  } else {
    return tokens.concat(suggestion).join(" ") + " ";
  }
}

/* ---------------------------
   ClassButtons Component
---------------------------- */
function ClassButtons({ suggestions, onButtonClick, currentClasses, aiTeacher }) {
  const handleClick = (s) => {
    const tokens = currentClasses.trim().split(/\s+/);
    if (aiTeacher && !tokens.includes(s)) {
      speakDescription(s);
    }
    onButtonClick(s);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => handleClick(s)}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------
   AutocompleteTextarea Component
---------------------------- */
function AutocompleteTextarea({ value, onChange, placeholder }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getLastToken = (text) => {
    const tokens = text.split(/\s+/);
    return tokens[tokens.length - 1] || "";
  };

  const handleInputChange = (e) => {
    const inputVal = e.target.value;
    onChange(e);
    const lastToken = getLastToken(inputVal);
    if (lastToken.length > 0) {
      const filtered = tailwindClasses.filter((cls) => cls.startsWith(lastToken));
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const tokens = value.split(/\s+/);
    tokens[tokens.length - 1] = suggestion;
    const newValue = tokens.join(" ") + " ";
    const syntheticEvent = { target: { value: newValue } };
    onChange(syntheticEvent);
    setShowSuggestions(false);
    const currentTokens = value.trim().split(/\s+/);
    if (!currentTokens.includes(suggestion)) {
      speakDescription(suggestion);
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full h-20 p-2 border rounded mb-2 bg-[#102B4C] text-white"
      />
      {showSuggestions && (
        <ul className="absolute z-10 bg-[#102B4C] border border-gray-600 rounded mt-1 w-full max-h-40 overflow-auto text-white">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* =======================
   Shared Card Classes
======================= */
const cardClasses = "border rounded p-4 shadow-sm bg-[#102B4C] text-white";

/* =======================
   Section Components
   (Basic-to-Advanced Tailwind CSS Concepts)
======================= */

// 1. Text Size
function SectionTextSize({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["text-xl", "text-2xl", "text-3xl", "text-xs", "text-sm", "text-lg", "text-base"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Text Size</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "text-3xl font-bold"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle text size classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p>This is sample text. Adjust its size!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Font Weight
function SectionFontWeight({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["font-thin", "font-light", "font-semibold", "font-bold", "font-medium"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Font Weight</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "font-thin"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle Font weight classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p>This is sample text. Adjust its Weight!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Text Color
function SectionTextColor({ aiTeacher }) {
  const [classes, setClasses] = useState("text-red-500");
  const suggestions = ["text-red-500", "text-blue-500", "text-green-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Text Color</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "text-red-500"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle text color.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <p className={`p-4 border rounded ${classes}`}>
            This text color is dynamic!
          </p>
        </div>
      </div>
    </div>
  );
}

// 4. Text Alignment
function SectionTextAlignment({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["text-left", "text-center", "text-right", "text-justify"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Text Alignment</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "text-center text-justify"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle text alignment classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p>This is sample text. Adjust its alignment!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Text Decoration
function SectionTextDecoration({ aiTeacher }) {
  const [classes, setClasses] = useState("italic underline uppercase");
  const suggestions = ["italic", "underline", "uppercase", "normal-case", "line-through", "no-underline"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Text Decoration</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "italic underline uppercase"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle font styles.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <p className={`p-4 border rounded ${classes}`}>
            Dynamic Font Styling!
          </p>
        </div>
      </div>
    </div>
  );
}

// 6. Background Color
function SectionBackground({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Background Color</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "bg-purple-500"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle background colors.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p className="text-white text-center font-bold">
              Background Preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Background Gradient
function SectionBackgroundGradient({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Background Gradient</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "bg-gradient-to-r"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle background gradient.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p className="text-white text-center font-bold">
              Background Preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Background Image
function SectionBackgroundImage({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["bg-none", "bg-cover", "bg-contain"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Background Image</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "bg-none"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle background Image.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p className="text-white text-center font-bold">
              Background Preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 9. Border Utilities
function SectionBorderRounded({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["border", "rounded", "border-2", "border-dashed", "rounded-md", "border-red-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Border Utilities</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "border-2 border-red-500 border-dashed shadow-sm"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle border utilities.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 transition-all duration-500 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <p className="text-center">Border & Rounded Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. Spacing (Padding & Margin)
function SectionSpacing({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["p-4", "p-8", "py-5", "px-5", "m-4", "m-8", "mx-5", "my-5", "gap-4"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Spacing (Padding & Margin)</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "p-4 m-4"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle spacing classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <div className="bg-gray-300 p-2 mb-2">Element 1</div>
            <div className="bg-gray-400 p-2">Element 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Sizing (Width & Height)
function SectionSizing({ aiTeacher }) {
  const [classes, setClasses] = useState("w-32 h-32");
  const suggestions = ["w-32", "h-32", "max-w-32", "min-w-32", "max-h-32", "min-h-32"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Sizing (Width & Height)</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "w-32 h-32"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle sizing classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div
            className={`border rounded bg-gray-300 ${classes} flex items-center justify-center`}
          >
            Box
          </div>
        </div>
      </div>
    </div>
  );
}

// 12. Flex Layout
function SectionFlex({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["flex", "gap-4", "flex-col", "flex-row", "inline-flex"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Flex Layout</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "flex inline-flex"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle classes by clicking buttons.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <label className="block font-medium mb-1">Preview:</label>
          <div
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <div className="p-4 bg-blue-500 text-white rounded mb-2">Box 1</div>
            <div className="p-4 bg-green-500 text-white rounded mb-2">Box 2</div>
            <div className="p-4 bg-red-500 text-white rounded">Box 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 13. Justify Content
function SectionJustifyContent({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["justify-center", "justify-end", "justify-between", "justify-evenly", "justify-around"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Justify Content</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "justify-center"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle justification.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-4 border rounded transition-all duration-500 flex ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <div className="p-4 bg-blue-500 text-white rounded">Box 1</div>
            <div className="p-4 bg-green-500 text-white rounded">Box 2</div>
            <div className="p-4 bg-red-500 text-white rounded">Box 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14. Flex Wrap
function SectionFlexWrap({ aiTeacher }) {
  const [classes, setClasses] = useState("flex flex-wrap gap-4");
  const suggestions = ["flex", "flex-wrap", "gap-4", "flex-nowrap"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Flex Wrap</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "flex flex-wrap gap-4"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle flex wrap classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`border rounded p-4 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <div className="bg-blue-300 p-4">Item 1</div>
            <div className="bg-green-300 p-4">Item 2</div>
            <div className="bg-red-300 p-4">Item 3</div>
            <div className="bg-yellow-300 p-4">Item 4</div>
            <div className="bg-purple-300 p-4">Item 5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 15. Align Items
function SectionAlignItems({ aiTeacher }) {
  const [classes, setClasses] = useState("flex flex-wrap gap-4");
  const suggestions = ["flex", "items-start", "items-center", "items-end", "items-baseline", "items-stretch"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Align Items</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "flex item-center"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle Align items classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`border rounded p-4 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <div className="bg-blue-300 p-4">Item 1</div>
            <div className="bg-green-300 p-4">Item 2</div>
            <div className="bg-red-300 p-4">Item 3</div>
            <div className="bg-yellow-300 p-4">Item 4</div>
            <div className="bg-purple-300 p-4">Item 5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 16. Grid Layout
function SectionGridLayout({ aiTeacher }) {
  const [classes, setClasses] = useState("grid grid-cols-2 gap-4");
  const suggestions = ["grid", "grid-cols-2", "grid-cols-4", "grid-rows-2", "gap-4"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Grid Layout</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "grid grid-cols-2 gap-4"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle grid classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <div className="bg-blue-300 p-4 text-center">Item 1</div>
            <div className="bg-green-300 p-4 text-center">Item 2</div>
            <div className="bg-red-300 p-4 text-center">Item 3</div>
            <div className="bg-yellow-300 p-4 text-center">Item 4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 17. Shadow
function SectionShadow({ aiTeacher }) {
  const [classes, setClasses] = useState("shadow-sm");
  const suggestions = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Shadow</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "shadow-sm"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle shadow effects.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <p className="text-center">Shadow Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 18. Opacity
function SectionOpacity({ aiTeacher }) {
  const [classes, setClasses] = useState("opacity-50 hover:opacity-100 transition-opacity duration-300");
  const suggestions = ["opacity-50", "hover:opacity-100", "transition-opacity", "duration-300"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Opacity</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "opacity-50 hover:opacity-100 transition-opacity duration-300"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle opacity classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div className={`p-8 border rounded ${classes}`}>
            <p className="text-center">Hover to change opacity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 19. Blur Utilities
function SectionBlurUtilities({ aiTeacher }) {
  const [classes, setClasses] = useState("shadow-sm");
  const suggestions = ["blur-sm", "blur-md", "blur-lg"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Blur Utilities</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "blur-sm"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle blur effects.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "150px" }}
          >
            <p className="text-center">Blur Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 20. Transition & Animation
function SectionTransitionAnimation({ aiTeacher }) {
  const [classes, setClasses] = useState("transform hover:scale-105 transition-transform duration-300");
  const suggestions = ["transform", "transition-transform", "duration-300", "transition-all", "transition-colors", "delay-300"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Transition & Animation</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "transform transition-transform duration-300"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle transition classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`p-8 border rounded ${classes}`}>
            <p>How to animate!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 21. Miscellaneous Utilities
function SectionMiscellaneousUtilities({ aiTeacher }) {
  const [classes, setClasses] = useState("overflow-auto");
  const suggestions = ["overflow-auto", "overflow-hidden", "overflow-scroll", "visible", "invisible"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Miscellaneous Utilities</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "overflow-auto"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle overflow classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`border rounded p-2 ${classes}`}
            style={{ maxHeight: "100px" }}
          >
            <p>
              This content is very long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, lorem nec cursus dictum, ligula orci tempor lectus, vitae consequat felis nisl sed risus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 22. Cursor
function SectionCursor({ aiTeacher }) {
  const [classes, setClasses] = useState("cursor-pointer");
  const suggestions = ["cursor-pointer", "cursor-default", "cursor-not-allowed", "invisible"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Cursor</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "cursor-pointer"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle cursor classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <button className={`px-6 py-3 border rounded ${classes}`}>Hover Me</button>
        </div>
      </div>
    </div>
  );
}

// 23. Responsive Design
function SectionResponsiveDesign({ aiTeacher }) {
  const [classes, setClasses] = useState("sm:text-sm md:text-lg lg:text-xl");
  const suggestions = ["sm:text-sm", "md:text-lg", "lg:text-xl"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Responsive Design</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "sm:text-sm md:text-lg lg:text-xl"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle responsive classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p>Resize the window to see changes!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 24. Hover Effects
function SectionHoverEffects({ aiTeacher }) {
  const [classes, setClasses] = useState("hover:bg-blue-500 hover:text-white");
  const suggestions = ["hover:bg-blue-500", "hover:text-white"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Hover Effects</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "hover:bg-blue-500 hover:text-white"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle hover classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <button className={`p-4 border rounded transition-all duration-300 ${classes}`}>
            Hover over me!
          </button>
        </div>
      </div>
    </div>
  );
}

// 25. Positioning
function SectionPositioning({ aiTeacher }) {
  const [parentClasses, setParentClasses] = useState("relative");
  const [childClasses, setChildClasses] = useState("absolute inset-0 flex items-center justify-center");
  const parentSuggestions = ["relative", "static", "absolute", "fixed"];
  const childSuggestions = ["absolute inset-0", "absolute top-0 right-0", "absolute bottom-0 left-0"];
  const handleParentChange = (e) => setParentClasses(e.target.value);
  const handleChildChange = (e) => setChildClasses(e.target.value);
  const handleParentButtonClick = (sugg) => setParentClasses(sugg);
  const handleChildButtonClick = (sugg) => setChildClasses(sugg);
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Positioning</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <label className="block font-medium mb-1">Parent positioning classes:</label>
          <AutocompleteTextarea
            value={parentClasses}
            onChange={handleParentChange}
            placeholder='e.g., "relative"'
          />
          <ClassButtons
            suggestions={parentSuggestions}
            onButtonClick={handleParentButtonClick}
            currentClasses={parentClasses}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Try: relative</strong>
          </p>
          <label className="block font-medium mb-1 mt-4">Child positioning classes:</label>
          <AutocompleteTextarea
            value={childClasses}
            onChange={handleChildChange}
            placeholder='e.g., "absolute inset-0 flex items-center justify-center"'
          />
          <ClassButtons
            suggestions={childSuggestions}
            onButtonClick={handleChildButtonClick}
            currentClasses={childClasses}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Try: absolute inset-0</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`border rounded p-8 ${parentClasses}`}
            style={{ minHeight: "150px" }}
          >
            <div className={`${childClasses} bg-blue-300 rounded`}>
              <p>Absolutely Positioned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 26. Animation
function SectionAnimation({ aiTeacher }) {
  const [classes, setClasses] = useState("animate-spin");
  const suggestions = ["animate-spin", "animate-ping", "animate-bounce", "animate-pulse"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Animation</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "animate-spin"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle animations.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`w-16 h-16 bg-blue-500 rounded-full ${classes}`}></div>
        </div>
      </div>
    </div>
  );
}

// 27. Rotate (Transform)
function SectionRotate({ aiTeacher }) {
  const [classes, setClasses] = useState("rotate-45");
  const suggestions = ["rotate-45", "rotate-90", "rotate-180", "rotate-0"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Rotate (Transform)</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "rotate-45"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle rotation classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`w-16 h-16 bg-green-500 rounded transition-transform duration-500 ${classes}`}></div>
        </div>
      </div>
    </div>
  );
}

// 28. Scale (Transform)
function SectionScale({ aiTeacher }) {
  const [classes, setClasses] = useState("scale-90");
  const suggestions = ["scale-90", "scale-100", "scale-110", "hover:scale-105"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Scale (Transform)</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "scale-90"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle scale classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`w-16 h-16 bg-purple-500 rounded transition-transform duration-500 ${classes}`}></div>
        </div>
      </div>
    </div>
  );
}

// 29. Skew (Transform)
function SectionSkew({ aiTeacher }) {
  const [classes, setClasses] = useState("skew-x-6");
  const suggestions = ["skew-x-6", "skew-x-12", "skew-y-6", "skew-y-12", "skew-x-0", "skew-y-0"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Skew (Transform)</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "skew-x-6"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle skew classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`w-16 h-16 bg-red-500 rounded transition-transform duration-500 ${classes}`}></div>
        </div>
      </div>
    </div>
  );
}

// 30. Ring (Focus Outline)
function SectionRing({ aiTeacher }) {
  const [classes, setClasses] = useState("ring-2 ring-offset-2 ring-indigo-500");
  const suggestions = ["ring-2", "ring-4", "ring-offset-2", "ring-offset-4", "ring-indigo-500", "ring-red-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Ring (Focus Outline)</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "ring-2 ring-offset-2 ring-indigo-500"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle ring classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <button
            className={`p-4 border rounded transition-all duration-500 ${classes}`}
          >
            Focus Ring Preview
          </button>
        </div>
      </div>
    </div>
  );
}

// 31. Outline
function SectionOutline({ aiTeacher }) {
  const [classes, setClasses] = useState("outline-none focus:outline");
  const suggestions = ["outline-none", "focus:outline", "focus:outline-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Outline</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "outline-none focus:outline"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle outline classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <input
            type="text"
            placeholder="Focus me"
            className={`p-4 border rounded transition-all duration-500 bg-[#102B4C] text-white ${classes}`}
          />
        </div>
      </div>
    </div>
  );
}

// 32. Object Fit
function SectionObjectFit({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["object-cover", "object-contain", "object-fill", "object-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Object Fit</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "object-cover"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle object-fit classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <img
            src="https://www.infispark.in/infi/infispark.png"
            alt="Example"
            className={`w-48 h-32 ${classes} border rounded`}
          />
        </div>
      </div>
    </div>
  );
}

// 33. Object Position
function SectionObjectPosition({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["object-center", "object-top", "object-bottom", "object-left", "object-right"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Object Position</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "object-center"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle object-position classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div className="w-48 h-32 border rounded overflow-hidden">
            <img
              src="https://www.infispark.in/infi/infispark.png"
              alt="Example"
              className={`w-full h-full ${classes}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 34. Z-Index
function SectionZIndex({ aiTeacher }) {
  const [classes, setClasses] = useState("z-10");
  const suggestions = ["z-0", "z-10", "z-20", "z-30", "z-40", "z-50"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={`${cardClasses} relative`}>
      <h2 className="text-2xl font-bold mb-2">Z-Index</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "z-10"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle z-index classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 relative" style={{ height: "150px" }}>
          <div
            className="absolute top-4 left-4 w-24 h-24 bg-blue-500"
            style={{ zIndex: 5 }}
          >
            Box 1
          </div>
          <div className={`absolute top-8 left-8 w-24 h-24 bg-red-500 ${classes}`}>
            Box 2
          </div>
        </div>
      </div>
    </div>
  );
}

// 35. Pointer Events
function SectionPointerEvents({ aiTeacher }) {
  const [classes, setClasses] = useState("pointer-events-auto");
  const suggestions = ["pointer-events-auto", "pointer-events-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Pointer Events</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "pointer-events-auto"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle pointer event classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div className={`p-4 border rounded ${classes}`}>
            <p>Try clicking this text.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 36. User Select
function SectionUserSelect({ aiTeacher }) {
  const [classes, setClasses] = useState("select-none");
  const suggestions = ["select-none", "select-text", "select-all", "select-auto"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) =>
    setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">User Select</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "select-none"'
          />
          <ClassButtons
            suggestions={suggestions}
            onButtonClick={handleButtonClick}
            currentClasses={classes}
            aiTeacher={aiTeacher}
          />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle user-select classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <p className={`p-4 border rounded ${classes}`}>
            Try selecting this text.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =======================
   UserForm Component
   (Shown as a modal if the user has not already submitted their details)
======================= */
function UserForm({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate phone number (exactly 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!role) {
      setError('Please select a role.');
      return;
    }
    setError('');
    const userData = { name, phone, role, timestamp: Date.now() };

    try {
      const userRef = ref(database, 'users');
      await push(userRef, userData);
      // Save a flag in localStorage so that the form does not show again
      localStorage.setItem('tailwindDone', 'true');
      onFormSubmit();
    } catch (err) {
      console.error("Error saving data to Firebase:", err);
      setError("Error saving data. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-[#0C1838] p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold">Enter Your Details To Enroll</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2 text-black-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded p-2 text-black-100"
            placeholder="10-digit phone number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded p-2 text-black-100"
            required
          >
            <option value="">Select your role</option>
            <option value="developer">Developer</option>
            <option value="beginner">Beginner</option>
            <option value="moderate">Moderate</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

/* =======================
   Main App Component
======================= */
function App() {
  // State for the AI Teacher toggle; by default it is off (false)
  const [aiTeacher, setAiTeacher] = useState(false);
  // State to track whether the user has submitted the form
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const isTailwindDone = localStorage.getItem('tailwindDone');
    if (isTailwindDone) {
      setFormSubmitted(true);
    }
  }, []);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen p-4 space-y-8" style={{ backgroundColor: "#0C1838" }}>
      {/* Show the user form if not already submitted */}
      {!formSubmitted && <UserForm onFormSubmit={handleFormSubmit} />}

      {/* Professional AI Teacher Toggle Button */}
      <div className="flex flex-col items-center justify-center mb-8">
        <button
          onClick={() => setAiTeacher((prev) => !prev)}
          className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all text-lg"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM9 10a1 1 0 112 0v2a1 1 0 11-2 0v-2zm4 0a1 1 0 112 0v2a1 1 0 11-2 0v-2z" />
          </svg>
          <span>{aiTeacher ? "Disable AI Teacher" : "Enable AI Teacher"}</span>
        </button>
        <p className="mt-4 text-white text-center text-xl font-semibold">
          Har section ek common Tailwind CSS concept ko demonstrate karta hai.
          <br />
          Aap apne classes type karein ya buttons ka use karein aur live preview dekhein!
        </p>
      </div>

      {/* Sections (Basic-to-Advanced Order) */}
      <SectionTextSize aiTeacher={aiTeacher} />
      <SectionFontWeight aiTeacher={aiTeacher} />
      <SectionTextColor aiTeacher={aiTeacher} />
      <SectionTextAlignment aiTeacher={aiTeacher} />
      <SectionTextDecoration aiTeacher={aiTeacher} />
      <SectionBackground aiTeacher={aiTeacher} />
      <SectionBackgroundGradient aiTeacher={aiTeacher} />
      <SectionBackgroundImage aiTeacher={aiTeacher} />
      <SectionBorderRounded aiTeacher={aiTeacher} />
      <SectionSpacing aiTeacher={aiTeacher} />
      <SectionSizing aiTeacher={aiTeacher} />
      <SectionFlex aiTeacher={aiTeacher} />
      <SectionJustifyContent aiTeacher={aiTeacher} />
      <SectionFlexWrap aiTeacher={aiTeacher} />
      <SectionAlignItems aiTeacher={aiTeacher} />
      <SectionGridLayout aiTeacher={aiTeacher} />
      <SectionShadow aiTeacher={aiTeacher} />
      <SectionOpacity aiTeacher={aiTeacher} />
      <SectionBlurUtilities aiTeacher={aiTeacher} />
      <SectionTransitionAnimation aiTeacher={aiTeacher} />
      <SectionMiscellaneousUtilities aiTeacher={aiTeacher} />
      <SectionCursor aiTeacher={aiTeacher} />
      <SectionResponsiveDesign aiTeacher={aiTeacher} />
      <SectionHoverEffects aiTeacher={aiTeacher} />
      <SectionPositioning aiTeacher={aiTeacher} />
      <SectionAnimation aiTeacher={aiTeacher} />
      <SectionRotate aiTeacher={aiTeacher} />
      <SectionScale aiTeacher={aiTeacher} />
      <SectionSkew aiTeacher={aiTeacher} />
      <SectionRing aiTeacher={aiTeacher} />
      <SectionOutline aiTeacher={aiTeacher} />
      <SectionObjectFit aiTeacher={aiTeacher} />
      <SectionObjectPosition aiTeacher={aiTeacher} />
      <SectionZIndex aiTeacher={aiTeacher} />
      <SectionPointerEvents aiTeacher={aiTeacher} />
      <SectionUserSelect aiTeacher={aiTeacher} />

      <div className="text-center mt-8 text-gray-300">
        <p>
          <strong>Tips:</strong> Click the buttons or type your own Tailwind CSS classes to see the live preview update!
        </p>
      </div>
    </div>
  );
}

export default App;
