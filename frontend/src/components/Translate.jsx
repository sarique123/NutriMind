import React, { useEffect } from "react";

const Translate = () => {
  useEffect(() => {

    const addGoogleTranslateScript = () => {
      // Check if the script is already added; if yes, don't add it again
      if (document.getElementById("google-translate-script")) return;

      // Create a new <script> element to load Google Translate script
      const script = document.createElement("script");
      script.id = "google-translate-script"; // Set the id for the script element
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; // Google Translate script source
      script.async = true; // Load the script asynchronously (non-blocking)
      document.body.appendChild(script); // Append the script to the body of the page
    };

    // Google Translate element initialization function
    window.googleTranslateElementInit = () => {
      // Initialize the Google Translate widget
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // The default language of the page (in this case, English)
          
        },
        "google_element" // The element where the Google Translate widget will be rendered
      );
    };

    // Call the function 
    addGoogleTranslateScript();
  }, []); 

  return (
    <div id="google_element"></div>
  );
};

export default Translate;
