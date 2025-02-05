import React, { useState } from 'react';

// List of Tailwind CSS class suggestions for autocomplete (not used directly in every section)
const tailwindClasses = [
  "flex", "grid", "justify-center", "justify-end", "justify-between", "items-center",
  "gap-4", "p-4", "p-8", "p-6", "m-4", "m-6", "m-8",
  "text-xl", "text-2xl", "text-3xl", "font-bold", "bg-blue-500", "bg-green-500",
  "bg-red-500", "bg-yellow-500", "bg-purple-500", "border", "border-2", "border-4",
  "border-8", "border-red-500", "border-blue-500", "border-green-500", "border-yellow-500",
  "border-purple-500", "border-dashed", "border-double", "shadow-sm", "shadow-md",
  "shadow-lg", "rounded", "rounded-lg", "rounded-full", "transition-all", "duration-500",
  // Additional suggestions
  "sm:text-sm", "md:text-lg", "lg:text-xl", "grid-cols-2", "grid-cols-3", "hover:bg-blue-500",
  "hover:scale-105", "transform", "transition-transform", "duration-300", "opacity-50",
  "hover:opacity-100", "flex-wrap", "text-red-500", "text-blue-500", "w-32", "h-32",
  "relative", "absolute", "inset-0", "italic", "underline", "uppercase"
];

/**
 * Helper function that toggles a CSS class in the given string.
 * @param {string} prev - The previous class string.
 * @param {string} suggestion - The class to toggle.
 * @returns {string} - The new class string.
 */
function toggleClass(prev, suggestion) {
  const tokens = prev.trim().split(/\s+/).filter(Boolean);
  if (tokens.includes(suggestion)) {
    return tokens.filter(token => token !== suggestion).join(" ") + (tokens.length > 1 ? " " : "");
  } else {
    return tokens.concat(suggestion).join(" ") + " ";
  }
}

// A common component to display class suggestion buttons
function ClassButtons({ suggestions, onButtonClick }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onButtonClick(s)}
          className="px-3 py-1 border rounded hover:bg-gray-200"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

// AutocompleteTextarea Component with updated input and suggestion dropdown background
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
   30 Tailwind Concepts
   ======================= */

// Shared card classes for sections
const cardClasses = "border rounded p-4 shadow-sm bg-[#102B4C] text-white";

// 1. Flex Layout
function SectionFlex() {
  const [classes, setClasses] = useState("");
  const suggestions = ["flex", "gap-4", "justify-center", "justify-end", "justify-between"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Flex Layout</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "flex gap-4 justify-center"'
          />
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 2. Text Size
function SectionTextSize() {
  const [classes, setClasses] = useState("");
  const suggestions = ["text-xl", "text-2xl", "text-3xl", "font-bold"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 3. Justify Content
function SectionJustifyContent() {
  const [classes, setClasses] = useState("");
  const suggestions = ["justify-center", "justify-end", "justify-between"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 4. Background Color
function SectionBackground() {
  const [classes, setClasses] = useState("");
  const suggestions = ["bg-blue-500", "bg-green-500", "bg-purple-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle background colors.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div
            className={`p-8 border rounded transition-all duration-500 ${classes}`}
            style={{ minHeight: "100px" }}
          >
            <p className="text-white text-center font-bold">Background Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Spacing (Padding & Margin)
function SectionSpacing() {
  const [classes, setClasses] = useState("");
  const suggestions = ["p-4", "p-8", "m-4", "m-8", "gap-4"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 6. Border & Rounded
function SectionBorderRounded() {
  const [classes, setClasses] = useState("");
  const suggestions = ["border", "rounded", "shadow-sm", "border-2", "border-dashed"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Border & Rounded</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "border-2 border-red-500 border-dashed shadow-sm"'
          />
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle border and rounding.</strong>
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

// 7. Responsive Design
function SectionResponsiveDesign() {
  const [classes, setClasses] = useState("sm:text-sm md:text-lg lg:text-xl");
  const suggestions = ["sm:text-sm", "md:text-lg", "lg:text-xl"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 8. Grid Layout
function SectionGridLayout() {
  const [classes, setClasses] = useState("grid grid-cols-2 gap-4");
  const suggestions = ["grid", "grid-cols-2", "grid-cols-3", "gap-4"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 9. Hover Effects
function SectionHoverEffects() {
  const [classes, setClasses] = useState("hover:bg-blue-500 hover:text-white");
  const suggestions = ["hover:bg-blue-500", "hover:text-white"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 10. Transition & Animation
function SectionTransitionAnimation() {
  const [classes, setClasses] = useState("transform hover:scale-105 transition-transform duration-300");
  const suggestions = ["transform", "hover:scale-105", "transition-transform", "duration-300"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Transition & Animation</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "transform hover:scale-105 transition-transform duration-300"'
          />
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle transition classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`p-8 border rounded ${classes}`}>
            <p>Hover to animate!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Opacity
function SectionOpacity() {
  const [classes, setClasses] = useState("opacity-50 hover:opacity-100 transition-opacity duration-300");
  const suggestions = ["opacity-50", "hover:opacity-100", "transition-opacity", "duration-300"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 12. Flex Wrap
function SectionFlexWrap() {
  const [classes, setClasses] = useState("flex flex-wrap gap-4");
  const suggestions = ["flex", "flex-wrap", "gap-4"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 13. Text Color
function SectionTextColor() {
  const [classes, setClasses] = useState("text-red-500");
  const suggestions = ["text-red-500", "text-blue-500", "text-green-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 14. Sizing (Width & Height)
function SectionSizing() {
  const [classes, setClasses] = useState("w-32 h-32");
  const suggestions = ["w-32", "h-32", "w-64", "h-64"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle sizing classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2 flex justify-center">
          <div className={`border rounded bg-gray-300 ${classes} flex items-center justify-center`}>
            Box
          </div>
        </div>
      </div>
    </div>
  );
}

// 15. Positioning
function SectionPositioning() {
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
          <ClassButtons suggestions={parentSuggestions} onButtonClick={handleParentButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Try: relative</strong>
          </p>
          <label className="block font-medium mb-1 mt-4">Child positioning classes:</label>
          <AutocompleteTextarea
            value={childClasses}
            onChange={handleChildChange}
            placeholder='e.g., "absolute inset-0 flex items-center justify-center"'
          />
          <ClassButtons suggestions={childSuggestions} onButtonClick={handleChildButtonClick} />
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

// 16. Font Styles
function SectionFontStyles() {
  const [classes, setClasses] = useState("italic underline uppercase");
  const suggestions = ["italic", "underline", "uppercase", "normal-case"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Font Styles</h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "italic underline uppercase"'
          />
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 17. Shadow (Box Shadows)
function SectionShadow() {
  const [classes, setClasses] = useState("shadow-sm");
  const suggestions = ["shadow-sm", "shadow-md", "shadow-lg", "shadow-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 18. Animation (Predefined animations)
function SectionAnimation() {
  const [classes, setClasses] = useState("animate-spin");
  const suggestions = ["animate-spin", "animate-ping", "animate-bounce", "animate-pulse"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 19. Ring (Focus rings)
function SectionRing() {
  const [classes, setClasses] = useState("ring-2 ring-offset-2 ring-indigo-500");
  const suggestions = ["ring-2", "ring-4", "ring-offset-2", "ring-offset-4", "ring-indigo-500", "ring-red-500"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 20. Outline
function SectionOutline() {
  const [classes, setClasses] = useState("outline-none focus:outline");
  const suggestions = ["outline-none", "focus:outline", "focus:outline-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 21. Rotate (Transform rotate)
function SectionRotate() {
  const [classes, setClasses] = useState("rotate-45");
  const suggestions = ["rotate-45", "rotate-90", "rotate-180", "rotate-0"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 22. Scale (Transform scale)
function SectionScale() {
  const [classes, setClasses] = useState("scale-90");
  const suggestions = ["scale-90", "scale-100", "scale-110"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 23. Skew (Transform skew)
function SectionSkew() {
  const [classes, setClasses] = useState("skew-x-6");
  const suggestions = ["skew-x-6", "skew-x-12", "skew-y-6", "skew-y-12", "skew-x-0", "skew-y-0"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 24. Object Fit
function SectionObjectFit() {
  const [classes, setClasses] = useState("object-cover");
  const suggestions = ["object-cover", "object-contain", "object-fill", "object-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle object-fit classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <img
            src="https://via.placeholder.com/200x150"
            alt="Example"
            className={`w-48 h-32 ${classes} border rounded`}
          />
        </div>
      </div>
    </div>
  );
}

// 25. Object Position
function SectionObjectPosition() {
  const [classes, setClasses] = useState("object-center");
  const suggestions = ["object-center", "object-top", "object-bottom", "object-left", "object-right"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
          <p className="text-sm text-gray-300 mt-2">
            <strong>Toggle object-position classes.</strong>
          </p>
        </div>
        <div className="md:w-1/2 p-2">
          <div className="w-48 h-32 border rounded overflow-hidden">
            <img
              src="https://via.placeholder.com/200x150"
              alt="Example"
              className={`w-full h-full ${classes}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 26. Overflow
function SectionOverflow() {
  const [classes, setClasses] = useState("overflow-auto");
  const suggestions = ["overflow-auto", "overflow-hidden", "overflow-scroll"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
  return (
    <div className={cardClasses}>
      <h2 className="text-2xl font-bold mb-2">Overflow</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <AutocompleteTextarea
            value={classes}
            onChange={handleChange}
            placeholder='e.g., "overflow-auto"'
          />
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 27. Z-Index
function SectionZIndex() {
  const [classes, setClasses] = useState("z-10");
  const suggestions = ["z-0", "z-10", "z-20", "z-30", "z-40", "z-50"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 28. Cursor
function SectionCursor() {
  const [classes, setClasses] = useState("cursor-pointer");
  const suggestions = ["cursor-pointer", "cursor-default", "cursor-not-allowed"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 29. Pointer Events
function SectionPointerEvents() {
  const [classes, setClasses] = useState("pointer-events-auto");
  const suggestions = ["pointer-events-auto", "pointer-events-none"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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

// 30. User Select
function SectionUserSelect() {
  const [classes, setClasses] = useState("select-none");
  const suggestions = ["select-none", "select-text", "select-all", "select-auto"];
  const handleChange = (e) => setClasses(e.target.value);
  const handleButtonClick = (sugg) => setClasses((prev) => toggleClass(prev, sugg));
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
          <ClassButtons suggestions={suggestions} onButtonClick={handleButtonClick} />
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
  return (
    <div className="min-h-screen p-4 space-y-8" style={{ backgroundColor: "#0C1838" }}>
      <h1 className="text-3xl font-bold text-center mb-4 text-white">
        Tailwind Class Analyzer
      </h1>
      <p className="text-center text-gray-300 mb-8">
        Each section demonstrates a common Tailwind CSS concept. Type your classes or use the buttons to toggle them and see the live preview!
      </p>
      {/* 30 Sections */}
      <SectionFlex />
      <SectionTextSize />
      <SectionJustifyContent />
      <SectionBackground />
      <SectionSpacing />
      <SectionBorderRounded />
      <SectionResponsiveDesign />
      <SectionGridLayout />
      <SectionHoverEffects />
      <SectionTransitionAnimation />
      <SectionOpacity />
      <SectionFlexWrap />
      <SectionTextColor />
      <SectionSizing />
      <SectionPositioning />
      <SectionFontStyles />
      <SectionShadow />
      <SectionAnimation />
      <SectionRing />
      <SectionOutline />
      <SectionRotate />
      <SectionScale />
      <SectionSkew />
      <SectionObjectFit />
      <SectionObjectPosition />
      <SectionOverflow />
      <SectionZIndex />
      <SectionCursor />
      <SectionPointerEvents />
      <SectionUserSelect />
      <div className="text-center mt-8 text-gray-300">
        <p>
          <strong>Tips:</strong> Click the buttons or type your own Tailwind CSS classes to see the live preview update!
        </p>
      </div>
    </div>
  );
}

export default App;
