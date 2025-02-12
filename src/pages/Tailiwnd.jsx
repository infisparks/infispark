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
  // Text Size
  "text-xl": "Sets the text size to extra large. Why we use it: To make headings or important text more visible.",
  "text-2xl": "Sets the text size to 2xl, larger than text-xl. Why we use it: To emphasize prominent text elements.",
  "text-3xl": "Sets the text size to 3xl, even larger text. Why we use it: To create standout headlines or focal points.",
  "text-xs": "Sets the text size to extra small. Why we use it: Useful for disclaimers or less important text.",
  "text-sm": "Sets the text size to small. Why we use it: Ideal for subtext or captions.",
  "text-lg": "Sets the text size to large. Why we use it: Enhances readability for prominent paragraphs.",
  "text-base": "Sets the text size to the base (default) size. Why we use it: Provides a standard size for regular content.",

  // Font Weight
  "font-thin": "Applies a very thin font weight. Why we use it: To create a light and airy text appearance.",
  "font-light": "Applies a light font weight. Why we use it: For a softer, more delicate text display.",
  "font-medium": "Applies a medium font weight. Why we use it: Balances readability and emphasis.",
  "font-semibold": "Applies a semi-bold font weight. Why we use it: To slightly highlight text without being too heavy.",
  "font-bold": "Applies a bold font weight. Why we use it: To draw attention to important text or headings.",

  // Text Color
  "text-red-500": "Sets the text color to a mid-level red. Why we use it: To indicate errors or draw attention.",
  "text-blue-500": "Sets the text color to a mid-level blue. Why we use it: For a calm and professional look.",
  "text-green-500": "Sets the text color to a mid-level green. Why we use it: Often used to indicate success or positivity.",

  // Text Alignment
  "text-left": "Aligns text to the left. Why we use it: For standard readability in left-to-right languages.",
  "text-center": "Centers the text horizontally. Why we use it: To create balanced layouts, especially for headings.",
  "text-right": "Aligns text to the right. Why we use it: Useful for aligning text in specific design contexts.",
  "text-justify": "Justifies the text, aligning both left and right edges. Why we use it: For a clean and professional block of text.",

  // Text Decoration
  "italic": "Makes the text italicized. Why we use it: To emphasize or differentiate text.",
  "underline": "Adds an underline to the text. Why we use it: Commonly used to indicate links or highlight text.",
  "uppercase": "Transforms the text to all uppercase letters. Why we use it: To create a strong, commanding appearance.",
  "normal-case": "Resets text transformation to normal case. Why we use it: When default text casing is required.",
  "line-through": "Adds a line through (strikes out) the text. Why we use it: Often used to show removal or discount.",
  "no-underline": "Removes any underline from the text. Why we use it: To override default underlining on links.",

  // Background Color
  "bg-blue-500": "Sets the background color to a mid-level blue. Why we use it: To create a vibrant or calming background.",
  "bg-green-500": "Sets the background color to a mid-level green. Why we use it: To indicate success or a natural theme.",
  "bg-purple-500": "Sets the background color to a mid-level purple. Why we use it: For a creative and elegant look.",
  "bg-red-500": "Sets the background color to a mid-level red. Why we use it: To capture attention or signal alerts.",

  // Background Gradient
  "bg-gradient-to-r": "Applies a background gradient that flows to the right. Why we use it: To add dynamic color transitions.",
  "bg-gradient-to-l": "Applies a background gradient that flows to the left. Why we use it: To create visually appealing backgrounds.",
  "bg-gradient-to-t": "Applies a background gradient that flows to the top. Why we use it: To enhance the depth of design elements.",
  "bg-gradient-to-b": "Applies a background gradient that flows to the bottom. Why we use it: To add a modern and stylish background effect.",

  // Background Image
  "bg-none": "Removes any background image or pattern. Why we use it: To ensure a clean, image-free background.",
  "bg-cover": "Scales the background image to cover the entire element. Why we use it: To maintain a full-coverage background image.",
  "bg-contain": "Scales the background image to be fully visible within the element. Why we use it: To ensure the whole image is displayed without cropping.",

  // Border & Rounded
  "border": "Applies a default border to the element. Why we use it: To visually separate content or add definition.",
  "rounded": "Rounds the corners of the element. Why we use it: For a softer, more modern appearance.",
  "border-2": "Sets the border width to 2 pixels. Why we use it: To create a thicker, more pronounced border.",
  "border-dashed": "Makes the border style dashed. Why we use it: To add a stylistic, non-solid border effect.",
  "rounded-md": "Applies a medium level of rounding to the corners. Why we use it: For a balanced, subtle roundness.",
  "border-red-500": "Sets the border color to a mid-level red. Why we use it: To draw attention or indicate importance.",

  // Spacing (Padding, Margin, Gap)
  "p-4": "Adds padding of 1rem on all sides. Why we use it: To create space inside elements for better readability.",
  "p-8": "Adds padding of 2rem on all sides. Why we use it: To provide extra interior spacing for larger elements.",
  "py-5": "Adds vertical padding of 1.25rem. Why we use it: To space out content vertically without affecting horizontal spacing.",
  "px-5": "Adds horizontal padding of 1.25rem. Why we use it: To space out content horizontally for improved layout.",
  "m-4": "Adds margin of 1rem on all sides. Why we use it: To create external spacing between elements.",
  "m-8": "Adds margin of 2rem on all sides. Why we use it: To provide more breathing room around larger elements.",
  "mx-5": "Adds horizontal margin of 1.25rem. Why we use it: To evenly space elements horizontally.",
  "my-5": "Adds vertical margin of 1.25rem. Why we use it: To separate elements vertically with balanced spacing.",
  "gap-4": "Adds a gap of 1rem between items in a flex or grid layout. Why we use it: To consistently space out items within a container.",

  // Sizing
  "w-32": "Sets the width to a fixed size (typically 8rem). Why we use it: To create consistent, fixed-width elements.",
  "h-32": "Sets the height to a fixed size (typically 8rem). Why we use it: To maintain uniform element heights.",
  "max-w-32": "Sets the maximum width to a fixed size (typically 8rem). Why we use it: To constrain elements within a specified width.",
  "min-w-32": "Sets the minimum width to a fixed size (typically 8rem). Why we use it: To ensure elements don't shrink below a certain width.",
  "max-h-32": "Sets the maximum height to a fixed size (typically 8rem). Why we use it: To limit the height of an element.",
  "min-h-32": "Sets the minimum height to a fixed size (typically 8rem). Why we use it: To guarantee a baseline height for elements.",

  // Flex Layout
  "flex": "Designates an element as a flex container. Why we use it: To enable flexible layouts and align child elements.",
  "flex-col": "Arranges flex items in a column. Why we use it: For vertical stacking of elements.",
  "flex-row": "Arranges flex items in a row. Why we use it: For horizontal alignment of elements.",
  "inline-flex": "Creates an inline-level flex container. Why we use it: To align flex items within inline content flow.",

  // Justify Content
  "justify-center": "Horizontally centers the flex items. Why we use it: To create a balanced, centered layout.",
  "justify-end": "Aligns flex items to the end (right) horizontally. Why we use it: To push items to the right side.",
  "justify-between": "Distributes items evenly with the first item at the start and the last at the end. Why we use it: To maximize spacing between items.",
  "justify-evenly": "Evenly distributes items with equal space around them. Why we use it: To ensure uniform spacing between all items.",
  "justify-around": "Distributes items with equal space before, between, and after them. Why we use it: To create balanced spacing with extra room on the ends.",

  // Flex Wrap
  "flex-wrap": "Allows flex items to wrap onto multiple lines. Why we use it: To manage overflow and maintain layout on smaller screens.",
  "flex-nowrap": "Prevents flex items from wrapping. Why we use it: To keep items on a single line regardless of container width.",

  // Align Items
  "items-start": "Aligns flex items to the start (top) vertically. Why we use it: To align items at the top for a clean start.",
  "items-center": "Centers flex items vertically. Why we use it: To achieve a balanced vertical alignment.",
  "items-end": "Aligns flex items to the end (bottom) vertically. Why we use it: To align items at the bottom for design consistency.",
  "items-baseline": "Aligns items along their text baselines. Why we use it: To ensure text lines up nicely across items.",
  "items-stretch": "Stretches flex items to fill the container vertically. Why we use it: To make items expand and fill available space.",

  // Grid Layout
  "grid": "Designates an element as a grid container. Why we use it: To create complex, two-dimensional layouts.",
  "grid-cols-2": "Creates a grid layout with 2 columns. Why we use it: For simple two-column designs.",
  "grid-cols-4": "Creates a grid layout with 4 columns. Why we use it: To evenly distribute content across four columns.",
  "grid-rows-2": "Creates a grid layout with 2 rows. Why we use it: To structure content into two horizontal sections.",

  // Shadow
  "shadow-sm": "Applies a small box shadow. Why we use it: To add a subtle depth effect.",
  "shadow-md": "Applies a medium box shadow. Why we use it: To enhance depth and separation between elements.",
  "shadow-lg": "Applies a large box shadow. Why we use it: To create a pronounced elevation effect.",
  "shadow-none": "Removes any box shadow. Why we use it: When no shadow effect is desired.",

  // Opacity & Transition (Opacity)
  "opacity-50": "Sets the element’s opacity to 50%. Why we use it: To make the element semi-transparent for design effects.",
  "hover:opacity-100": "Sets the element’s opacity to 100% when hovered. Why we use it: To highlight elements on user interaction.",
  "transition-opacity": "Enables smooth transitions for opacity changes. Why we use it: To provide a gradual opacity change effect.",
  "duration-300": "Sets the transition duration to 300ms. Why we use it: To control the speed of transitions for a smooth effect.",

  // Blur Utilities
  "blur-sm": "Applies a small blur effect to the element. Why we use it: To create a light, out-of-focus background.",
  "blur-md": "Applies a medium blur effect to the element. Why we use it: For a more noticeable blur that softens details.",
  "blur-lg": "Applies a large blur effect to the element. Why we use it: To strongly obscure background details for focus on foreground elements.",

  // Transition & Animation (General)
  "transform": "Enables CSS transforms on the element. Why we use it: To allow rotation, scaling, and other transformations.",
  "transition-transform": "Enables smooth transitions for transform changes. Why we use it: To animate transform effects smoothly.",
  "transition-all": "Enables smooth transitions for all properties. Why we use it: For a comprehensive animated effect on multiple changes.",
  "transition-colors": "Enables smooth transitions for color changes. Why we use it: To create a fluid color change effect on interactions.",
  "delay-300": "Adds a delay of 300ms before the transition starts. Why we use it: To time transitions appropriately for better user experience.",

  // Miscellaneous Utilities
  "overflow-auto": "Adds scrollbars automatically when content overflows. Why we use it: To handle extra content without breaking layout.",
  "overflow-hidden": "Hides any content that overflows the element. Why we use it: To create clean edges by concealing excess content.",
  "overflow-scroll": "Always shows scrollbars when content overflows. Why we use it: To indicate that content can be scrolled.",
  "visible": "Ensures the element is visible. Why we use it: To override any hidden visibility settings.",
  "invisible": "Makes the element invisible while it still occupies space. Why we use it: To hide content without affecting layout structure.",

  // Cursor
  "cursor-pointer": "Changes the cursor to a pointer when hovering. Why we use it: To indicate clickable elements.",
  "cursor-default": "Uses the default cursor. Why we use it: For standard non-interactive elements.",
  "cursor-not-allowed": "Displays a 'not allowed' cursor, indicating the action is disabled. Why we use it: To signal that an action is not permitted.",

  // Responsive Design
  "sm:text-sm": "Sets the text size to small on small screens. Why we use it: To improve readability on smaller devices.",
  "md:text-lg": "Sets the text size to large on medium screens. Why we use it: To enhance visibility on medium-sized devices.",
  "lg:text-xl": "Sets the text size to extra large on large screens. Why we use it: To ensure prominent display on larger devices.",

  // Hover Effects
  "hover:bg-blue-500": "Changes the background color to blue when hovered. Why we use it: To provide visual feedback during interaction.",
  "hover:text-white": "Changes the text color to white when hovered. Why we use it: To improve contrast and highlight elements on hover.",

  // Positioning
  "relative": "Positions the element relative to its normal position. Why we use it: To allow absolute positioning of child elements.",
  "static": "Uses the default static positioning. Why we use it: For elements that follow the normal document flow.",
  "absolute": "Positions the element absolutely relative to its nearest positioned ancestor. Why we use it: To place elements precisely where needed.",
  "fixed": "Fixes the element relative to the viewport. Why we use it: To keep elements in view even during scrolling.",
  "absolute inset-0": "Positions the element absolutely with all offsets (top, right, bottom, left) set to 0. Why we use it: To cover the entire area of the parent element.",
  "absolute top-0 right-0": "Positions the element absolutely at the top-right corner. Why we use it: To align elements to the top-right.",
  "absolute bottom-0 left-0": "Positions the element absolutely at the bottom-left corner. Why we use it: To align elements to the bottom-left.",

  // Animation
  "animate-spin": "Applies a continuous spinning animation. Why we use it: To indicate loading or dynamic activity.",
  "animate-ping": "Applies a ping effect (scaling and fading) animation. Why we use it: To draw attention to a specific element.",
  "animate-bounce": "Applies a bouncing animation. Why we use it: To create a playful, eye-catching effect.",
  "animate-pulse": "Applies a pulsing (fading) animation. Why we use it: To subtly highlight an element with rhythmic opacity changes.",

  // Rotate (Transform)
  "rotate-45": "Rotates the element by 45 degrees. Why we use it: To add a tilted or dynamic look to an element.",
  "rotate-90": "Rotates the element by 90 degrees. Why we use it: For dramatic orientation changes.",
  "rotate-180": "Rotates the element by 180 degrees. Why we use it: To flip the element upside down.",
  "rotate-0": "No rotation is applied to the element. Why we use it: To maintain the element's original orientation.",

  // Scale (Transform)
  "scale-90": "Scales the element to 90% of its original size. Why we use it: To create a slightly reduced visual effect.",
  "scale-100": "Keeps the element at its original size (100%). Why we use it: To display elements in their natural size.",
  "scale-110": "Scales the element to 110% of its original size. Why we use it: To subtly enlarge an element for emphasis.",
  "hover:scale-105": "Scales the element to 105% of its size when hovered. Why we use it: To provide interactive feedback by slightly enlarging on hover.",

  // Skew (Transform)
  "skew-x-6": "Skews the element by 6 degrees along the X-axis. Why we use it: To add an angled effect to elements horizontally.",
  "skew-x-12": "Skews the element by 12 degrees along the X-axis. Why we use it: For a more pronounced horizontal skew effect.",
  "skew-y-6": "Skews the element by 6 degrees along the Y-axis. Why we use it: To add a subtle vertical angle to an element.",
  "skew-y-12": "Skews the element by 12 degrees along the Y-axis. Why we use it: For a stronger vertical skew effect.",
  "skew-x-0": "Removes any skew along the X-axis. Why we use it: To reset horizontal skew to normal.",
  "skew-y-0": "Removes any skew along the Y-axis. Why we use it: To reset vertical skew to normal.",

  // Ring (Focus Outline)
  "ring-2": "Applies a ring (outline) with a width of 2 pixels. Why we use it: To highlight focus state with a subtle outline.",
  "ring-4": "Applies a ring with a width of 4 pixels. Why we use it: For a more noticeable focus outline effect.",
  "ring-offset-2": "Adds a 2-pixel offset around the ring. Why we use it: To provide space between the element and its ring.",
  "ring-offset-4": "Adds a 4-pixel offset around the ring. Why we use it: To create a more pronounced gap around the focus ring.",
  "ring-indigo-500": "Sets the ring color to an indigo shade. Why we use it: To apply a specific color theme to focus outlines.",
  "ring-red-500": "Sets the ring color to a red shade. Why we use it: To draw strong attention to focused elements.",

  // Outline
  "outline-none": "Removes the default outline from the element. Why we use it: To create a cleaner design when custom focus styles are applied.",
  "focus:outline": "Displays the default outline when the element is focused. Why we use it: To indicate focus in form elements and interactive components.",
  "focus:outline-none": "Removes the outline even when the element is focused. Why we use it: When you want to disable the focus outline for design purposes.",

  // Object Fit
  "object-cover": "Scales the replaced content to cover the element while maintaining aspect ratio. Why we use it: To ensure the background or image fully covers the container.",
  "object-contain": "Scales the replaced content to be fully contained within the element. Why we use it: To display the entire image without cropping.",
  "object-fill": "Stretches the replaced content to fill the element, which may distort its aspect ratio. Why we use it: When complete coverage is needed regardless of aspect ratio.",
  "object-none": "Prevents the replaced content from being resized to fit the element. Why we use it: To maintain the original dimensions of an image.",

  // Object Position
  "object-center": "Centers the replaced content within its container. Why we use it: To align images or videos centrally.",
  "object-top": "Aligns the replaced content to the top of its container. Why we use it: To focus on the upper part of an image.",
  "object-bottom": "Aligns the replaced content to the bottom of its container. Why we use it: To emphasize the lower portion of an image.",
  "object-left": "Aligns the replaced content to the left of its container. Why we use it: For left-aligned image positioning.",
  "object-right": "Aligns the replaced content to the right of its container. Why we use it: For right-aligned image positioning.",

  // Z-Index
  "z-0": "Sets the z-index to 0. Why we use it: To position an element at the base layer.",
  "z-10": "Sets the z-index to 10. Why we use it: To stack an element above those with lower z-index.",
  "z-20": "Sets the z-index to 20. Why we use it: For layering elements more prominently.",
  "z-30": "Sets the z-index to 30. Why we use it: To ensure an element is placed even higher in the stacking order.",
  "z-40": "Sets the z-index to 40. Why we use it: For advanced layering needs.",
  "z-50": "Sets the z-index to 50. Why we use it: To bring an element to the very front of the stack.",

  // Pointer Events
  "pointer-events-auto": "Enables pointer events on the element. Why we use it: To allow interactions such as clicks.",
  "pointer-events-none": "Disables pointer events on the element. Why we use it: To prevent user interactions with an element.",

  // User Select
  "select-none": "Prevents the user from selecting text. Why we use it: To improve user experience where text selection is undesired.",
  "select-text": "Allows text selection. Why we use it: For interactive content where text needs to be highlighted.",
  "select-all": "Selects all the text when interacted with. Why we use it: To facilitate easy copying of content.",
  "select-auto": "Uses the browser’s default text selection behavior. Why we use it: To revert to standard text selection."
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
      {/* Suggestion Banner at the Top */}
     

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
      </div> <div className="bg-blue-600 text-white text-center p-2 rounded mb-4">
        <p>
          Suggestion: Watch this Tailwind CSS video for a simple explanation:&nbsp;
          <a href="https://www.youtube.com/watch?v=_9mTJ84uL1Q" target="_blank" rel="noopener noreferrer" className="underline">
            Watch Now
          </a>
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