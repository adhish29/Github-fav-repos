import React from "react";
import PropTypes from "prop-types";

function LanguageNav({ languages, language, onChangeLanguage }) {
  return (
    <ul className="container flex-center">
      {languages.map((lang) => (
        <li
          key={lang}
          style={lang === language ? { color: "rgb(187,46,31)" } : null}
        >
          <button
            className="btn-clear nav-link"
            onClick={() => onChangeLanguage(lang)}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguageNav.propTypes = {
  languages: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
};

export default LanguageNav;
