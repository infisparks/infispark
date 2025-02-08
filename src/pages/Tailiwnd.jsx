import React, { useState } from 'react';

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
  "p-4": "p-4 se element ke andar 1rem padding add hoti hai. Example: Box ke andar content aur border ke beech space.",
  "p-8": "p-8 se element ke andar 2rem padding add hoti hai. Example: Zyada space inside the box.",
  "p-6": "p-6 se element ke andar 1.5rem padding add hoti hai.",
  "m-4": "m-4 se element ke bahar 1rem margin add hota hai. Example: Box ke bahar space badhta hai.",
  "m-6": "m-6 se element ke bahar 1.5rem margin add hota hai.",
  "m-8": "m-8 se element ke bahar 2rem margin add hota hai.",
  "text-xl": "text-xl se text ka size 1.25rem hota hai. Example: Thoda bada text.",
  "text-2xl": "text-2xl se text ka size 1.5rem hota hai. Example: Aur bada text.",
  "text-3xl": "text-3xl se text ka size 1.875rem hota hai. Example: Bahut bada text.",
  "text-4xl" : "text-4xl se text ka size 1.875rem hota hai. Example: Bahut bada text.",
  "text-xs" : "Bahut chhota font size lagata hai.",
  "text-sm" : "Chhota font size lagata hai.",
  "text-base" : "Default font size lagata hai.",
  "text-lg" : "Bada font size lagata hai.",
  "font-thin": "Bahut patla font weight lagata hai.",
  "font-light": "Halka font weight lagata hai.",
  "font-medium": "Thoda mota font weight lagata hai.",
  "font-semibold": "Aur jyada mota font weight lagata hai.",
  "font-bold": "Mota font weight lagata hai.",
  "bg-blue-500": "bg-blue-500 se element ka background blue ho jata hai. Example: Blue box.",
  "bg-green-500": "bg-green-500 se background green ho jata hai.",
  "bg-red-500": "bg-red-500 se background red ho jata hai.",
  "bg-yellow-500": "bg-yellow-500 se background yellow ho jata hai.",
  "bg-purple-500": "bg-purple-500 se background purple ho jata hai.",
  "bg-gradient-to-r": "Background ko right direction me gradient lagata hai.",
  "bg-gradient-to-l": "Background ko left direction me gradient lagata hai.",
  "bg-gradient-to-t": "Background ko top direction me gradient lagata hai.",
  "bg-gradient-to-b": "Background ko bottom direction me gradient lagata hai.",
  "bg-none": "Background image hata deta hai.",
  "bg-cover": "Background image ko pura cover karta hai.",
  "bg-contain": "Background image ko andar fit karta hai.",
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
  "shadow-sm": "shadow-sm se halka shadow add hota hai. Example: Chhota shadow effect.",
  "shadow-md": "shadow-md se medium shadow effect hota hai.",
  "shadow-lg": "shadow-lg se bada shadow effect hota hai.",
  "rounded": "rounded se element ke corners round ho jate hain.",
  "rounded-lg": "rounded-lg se corners thode zyada round ho jate hain.",
  "rounded-full": "rounded-full se element completely circular ho jata hai. Example: Avatar.",
  "rounded-md": "Medium size ka rounded corner lagata hai.",
  "rounded-sm": "Small size ka rounded corner lagata hai.",
  "m-4": "Element ka margin set karta hai.",
  "mx-5": "Left aur right ka margin set karta hai.",
  "my-5": "Top aur bottom ka margin set karta hai.",
  "p-4": "Element ka padding set karta hai.",
  "px-5": "Left aur right ka padding set karta hai.",
  "py-5": "Top aur bottom ka padding set karta hai.",
  "max-w-32": "Maximum width set karta hai.",
  "min-w-32": "Minimum width set karta hai.",
  "max-h-32": "Maximum height set karta hai.",
  "min-h-32": "Minimum height set karta hai.",
  "flex-row": "Items ko row me arrange karta hai.",
  "flex-col": "Items ko column me arrange karta hai.",
  "inline-flex": "Element ko inline flexbox me convert karta hai.",
  "justify-around": "Items ke 4 taraf equal space deta hai.",
  "justify-evenly": "Items ke beech aur edges ke equal space deta hai.",
  "flex-nowrap": "Items ko wrap hone se rokta hai.",
  "items-start": "Items ko top pe align karta hai.",
  "items-center": "Items ko center me align karta hai.",
  "items-end": "Items ko bottom pe align karta hai.",
  "items-baseline": "Items ko text baseline ke hisaab se align karta hai.",
  "items-stretch": "Items ki height ko equal karta hai.",
  "transition-all": "transition-all se sabhi changes smooth transition ke sath hote hain.",
  "duration-500": "duration-500 se transition 500ms ka hota hai.",
  "sm:text-sm": "sm:text-sm se small screens pe text size chhota ho jata hai.",
  "md:text-lg": "md:text-lg se medium screens pe text size bada ho jata hai.",
  "lg:text-xl": "lg:text-xl se large screens pe text aur bada ho jata hai.",
  "grid-cols-2": "grid-cols-2 se grid mein 2 columns bante hain.",
  "grid-cols-3": "grid-cols-3 se grid mein 3 columns bante hain.",
  "grid-cols-4": "grid-cols-4 se grid mein 4 columns bante hain.",
  "grid-rows-2": "grid-rows-2 se grid mein 2 rows bante hain.",
  "shadow-md": "Medium size ki shadow lagata hai.",
  "shadow-lg": "Badi shadow lagata hai.",
  "shadow-none" : "Koi shadow nahi lagta hai.",
  "transition-opacity" :"mouse rakhne par opacity change hota hai.",
  "blur-sm": "Chhota blur effect lagata hai.",
  "blur-md": "Medium blur effect lagata hai.",
  "blur-lg": "Bada blur effect lagata hai.",
  "transition-colors": "Sirf color ke liye transition lagata hai.",
  "delay-300": "Animation ka delay set karta hai.",
  "overflow-auto": "Content overflow hone par scrollbar dikhata hai.",
  "overflow-hidden": "Overflowing content ko chhupa deta hai.",
  "overflow-scroll": "Hamesha scrollbar dikhata hai, chahe zaroori ho ya nahi.",
  "visible": "Element ko dikhata hai.",
  "invisible": "Element ko chhupa deta hai par layout me jagah leta hai.",
  "z-0": "Element ka z-index 0 set karta hai (sabse neeche).",
  "z-10": "Element ka z-index 10 set karta hai.",
  "z-20": "Element ka z-index 20 set karta hai.",
  "z-30": "Element ka z-index 30 set karta hai.",
  "z-40": "Element ka z-index 40 set karta hai.",
  "z-50": "Element ka z-index 50 set karta hai (sabse upar default).",
  "cursor-pointer": "Cursor ko pointer (hand icon) banata hai.",
  "cursor-default": "Cursor ko default style me set karta hai.",
  "cursor-not-allowed": "Cursor ko 'not allowed' (🚫) style me dikhata hai.",
  "animate-spin": "Element ko continuous ghumata hai (rotation).",
  "animate-ping": "Ek halka sa pulse effect create karta hai.",
  "animate-bounce": "Element ko upar neeche bounce karata hai.",
  "animate-pulse": "Ek slow fade-in fade-out effect deta hai.",
  "rotate-0": "Element ko koi rotation nahi deta (default).",
  "rotate-45": "Element ko 45 degrees ghumata hai.",
  "rotate-90": "Element ko 90 degrees ghumata hai.",
  "rotate-180": "Element ko 180 degrees ghumata hai (ulta kar deta hai).",
"scale-90": "Element ka size 90% kar deta hai.",
  "scale-100": "Element ka size normal (100%) rakhta hai.",
  "scale-110": "Element ka size 110% kar deta hai.",
  "skew-x-6": "Element ko X-axis par 6 degrees tilt karta hai.",
  "skew-x-12": "Element ko X-axis par 12 degrees tilt karta hai.",
  "skew-y-6": "Element ko Y-axis par 6 degrees tilt karta hai.",
  "skew-y-12": "Element ko Y-axis par 12 degrees tilt karta hai.",
  "skew-x-0": "Element ko X-axis par koi tilt nahi deta.",
  "skew-y-0": "Element ko Y-axis par koi tilt nahi deta.",
  "ring-2": "Element ke aaspaas 2px ka ring border lagata hai.",
  "ring-4": "Element ke aaspaas 4px ka ring border lagata hai.",
  "ring-offset-2": "Ring ka offset 2px badhata hai.",
  "ring-offset-4": "Ring ka offset 4px badhata hai.",
  "ring-indigo-500": "Ring ka color indigo (shade 500) set karta hai.",
  "ring-red-500": "Ring ka color red (shade 500) set karta hai.",
  "outline-none": "Element ki outline hata deta hai.",
  "focus:outline": "Element par focus hone par outline dikhata hai.",
  "focus:outline-none": "Element par focus hone par outline nahi dikhata.",
  "object-cover": "Image ko poore container me fit karta hai bina distortion ke.",
  "object-contain": "Image ko container me adjust karta hai bina crop kiye.",
  "object-fill": "Image ko container ka pura space fill karne par majboor karta hai.",
  "object-none": "Image ka original size maintain karta hai bina adjust kiye.",
  "object-center": "Image ko center me align karta hai.",
  "object-top": "Image ko top par align karta hai.",
  "object-bottom": "Image ko bottom par align karta hai.",
  "object-left": "Image ko left par align karta hai.",
  "object-right": "Image ko right par align karta hai.",
  "pointer-events-auto": "Element par pointer events allow karta hai.",
  "pointer-events-none": "Element par pointer events disable karta hai.",
  "select-none": "Text selection disable karta hai.",
  "select-text": "Text selection allow karta hai.",
  "select-all": "Pure text ko ek sath select karne deta hai.",
  "select-auto": "Browser ke default selection behavior ko follow karta hai.",
  "hover:bg-blue-500": "hover:bg-blue-500 se mouse hover pe background blue ho jata hai.",
  "hover:scale-105": "hover:scale-105 se mouse hover pe element 105% scale ho jata hai.",
  "transform": "transform se element ko rotate, scale, etc. kar sakte hain.",
  "transition-transform": "transition-transform se transform changes smooth hote hain.",
  "duration-300": "duration-300 se transition 300ms ka hota hai.",
  "opacity-50": "opacity-50 se element 50% transparent ho jata hai.",
  "hover:opacity-100": "hover:opacity-100 se hover pe element fully opaque ho jata hai.",
  "flex-wrap": "flex-wrap se flex container ke items wrap ho jate hain jab space kam ho.",
  "text-red-500": "text-red-500 se text red ho jata hai.",
  "text-blue-500": "text-blue-500 se text blue ho jata hai.",
  "w-32": "w-32 se element ki width 8rem (128px) fix ho jati hai.",
  "h-32": "h-32 se element ki height 8rem (128px) fix ho jati hai.",
  "relative": "relative se element ki position relative ho jati hai. Example: A child element positioned relative to its parent.",
  "absolute": "absolute se element ki position absolute ho jati hai. Example: Overlapping content.",
  "inset-0": "inset-0 se element container ke sabhi sides se chipak jata hai.",
  "italic": "italic se text italic ho jata hai.",
  "underline": "underline se text underline ho jata hai.",
  "uppercase": "uppercase se text uppercase ho jata hai.",
  "line-through":"Text ke beech me line lagata hai.",
  "no-underline":"Text ki underline hata deta hai."

};
/* ---------------------------
   Speech Synthesis Function
   (Cancels previous speech if needed)
---------------------------- */
function speakDescription(suggestion) {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
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
   Updated ClassButtons Component
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
   Sections (Ordered Basic to Advanced)
======================= */

// 1. Text Size
function SectionTextSize({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["text-xl", "text-2xl", "text-3xl" ,"text-xs","text-sm","text-lg","text-base"  ];
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


//2.Font Weight
function SectionFontWeight({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["font-thin","font-light","font-semibold","font-bold","font-medium" ];
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
            <strong>Toggle Font weight classes .</strong>
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
  const suggestions = ["text-left","text-center","text-right","text-justify" ];
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


// 5. TEXT DECORATION
function SectionTextDecoration({ aiTeacher }) {
  const [classes, setClasses] = useState("italic underline uppercase");
  const suggestions = ["italic", "underline", "uppercase", "normal-case","line-through","no-underline"];
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
  const suggestions = ["bg-blue-500", "bg-green-500", "bg-purple-500","bg-red-500"];
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


// 7.Background Gradient
function SectionBackgroundGradient({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["bg-gradient-to-r", "bg-gradient-to-l","bg-gradient-to-t","bg-gradient-to-b" ];
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



// 8.Background Image
function SectionBackgroundImage({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["bg-none","bg-cover","bg-contain" ];
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




// 9.Border Utilities
function SectionBorderRounded({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = [
    "border",
    "rounded",
    "border-2",
    "border-dashed","rounded-md","border-red-500"
  ];
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

// 10.Spacing (Padding & Margin)
function SectionSpacing({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["p-4", "p-8","py-5","px-5", "m-4", "m-8","mx-5","my-5", "gap-4"];
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

// 11.Sizing (Width & Height)
function SectionSizing({ aiTeacher }) {
  const [classes, setClasses] = useState("w-32 h-32");
  const suggestions = ["w-32", "h-32", "max-w-32","min-w-32","max-h-32","min-h-32"];
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

// 12.Flex Layout
function SectionFlex({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = [
    "flex",
    "gap-4",
    "flex-col","flex-row","inline-flex ",
  ];
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

// 13.Justify Content
function SectionJustifyContent({ aiTeacher }) {
  const [classes, setClasses] = useState("");
  const suggestions = ["justify-center", "justify-end", "justify-between","justify-evenly","justify-around"];
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

// 14.Flex Wrap
function SectionFlexWrap({ aiTeacher }) {
  const [classes, setClasses] = useState("flex flex-wrap gap-4");
  const suggestions = ["flex", "flex-wrap", "gap-4","flex-nowrap"];
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



// 15.Align Items
function SectionAlignItems({ aiTeacher }) {
  const [classes, setClasses] = useState("flex flex-wrap gap-4");
  const suggestions = ["flex","items-start","items-center","items-end","items-baseline","items-stretch"];
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


// 16.Grid Layout
function SectionGridLayout({ aiTeacher }) {
  const [classes, setClasses] = useState("grid grid-cols-2 gap-4");
  const suggestions = ["grid", "grid-cols-2","grid-cols-4", "grid-rows-2", "gap-4"];
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
  const suggestions = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-none",];
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


// 18.Opacity
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




// 19.Blur Utilities
function SectionBlurUtilities({ aiTeacher }) {
  const [classes, setClasses] = useState("shadow-sm");
  const suggestions = ["blur-sm","blur-md","blur-lg"];
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


// 20.Transition & Animation
function SectionTransitionAnimation({ aiTeacher }) {
  const [classes, setClasses] = useState("transform hover:scale-105 transition-transform duration-300",);
  const suggestions = ["transform",  "transition-transform", "duration-300","transition-all","transition-colors","delay-300"];
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
            placeholder='e.g., "transform  transition-transform duration-300"'
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


// 21.MiscellanousUtilities
function SectionMiscellaneousUtilities({ aiTeacher }) {
  const [classes, setClasses] = useState("overflow-auto");
  const suggestions = ["overflow-auto", "overflow-hidden", "overflow-scroll","visible","invisible"];
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
              This content is very long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              volutpat, lorem nec cursus dictum, ligula orci tempor lectus, vitae consequat felis nisl sed risus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// 22.Cursor
function SectionCursor({ aiTeacher }) {
  const [classes, setClasses] = useState("cursor-pointer");
  const suggestions = ["cursor-pointer", "cursor-default", "cursor-not-allowed","invisible"];
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



// 23.Responsive Design
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

// 24.Hover Effects
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




// 25.Positioning
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






// 26.Animation
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

// 27.Rotate
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

// 28.Scale
function SectionScale({ aiTeacher }) {
  const [classes, setClasses] = useState("scale-90");
  const suggestions = ["scale-90", "scale-100", "scale-110","hover:scale-105"];
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

// 29.Skew
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

// 30.Ring
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

// 31.Outline
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

// 32.Object Fit
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

// 33.Object Position
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



// 34.Z-Index
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



// 35.Pointer Events
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

// 36.User Select
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
   Main App Component
======================= */
function App() {
  // State for the AI Teacher toggle; by default it is off (false)
  const [aiTeacher, setAiTeacher] = useState(false);

  return (
    <div className="min-h-screen p-4 space-y-8" style={{ backgroundColor: "#0C1838" }}>
      {/* Professional AI Teacher Toggle Button */}
      <div className="flex flex-col items-center justify-center mb-8">
        <button
          onClick={() => setAiTeacher((prev) => !prev)}
          className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all text-lg"
        >
          {/* Premium AI Icon (Inline SVG) */}
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

      {/* Sections in basic-to-advanced order */}
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
