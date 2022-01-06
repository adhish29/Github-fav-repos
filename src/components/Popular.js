import React, { useEffect, useState } from "react";
import LanguageNav from "./LanguageNav";
import "../App.css";

function Popular() {
  const languages = ["All", "JavaScript", "React", "CSS", "Python"];

  const [language, setLanguage] = useState("All");
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  console.log(repos);

  useEffect(() => {
    updateLanguage(language);
  }, [language]);

  function updateLanguage(lang) {
    setLanguage(lang);
    setError(null);

    // console.log(lang);
    if (!repos[language]) {
      console.log("hello");
      fetch(
        `https://api.github.com/search/repositories?q=${lang}&sort=stars&order=desc`
      )
        .then((res) => res.json())
        .then((data) => {
          setRepos((repos) => ({ ...repos, [language]: data.items }));

          setError(null);
        })
        .catch((err) => {
          console.log(err);
          setError("there was an error fetching new repositories");
        });
    }
  }
  function isLoading() {
    return !repos[language] && error === null;
  }

  return (
    <>
      <LanguageNav
        languages={languages}
        language={language}
        onChangeLanguage={updateLanguage}
      />
      {isLoading() && <p>LOADING</p>}
      {error && <p>{error}</p>}
      {repos[language] && <pre>{JSON.stringify(repos[language], null, 2)}</pre>}
    </>
  );
}

export default Popular;
