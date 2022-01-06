import React, { useEffect, useState } from "react";
import LanguageNav from "./LanguageNav";
import "../App.css";

function Popular() {
  const languages = ["All", "JavaScript", "React", "CSS", "Python"];

  const [language, setLanguage] = useState("All");
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateLanguage(language);
  }, [language]);

  function updateLanguage(lang) {
    setLanguage(lang);
    setError(null);
    setRepos(null);
    console.log(lang);
    fetch(
      `https://api.github.com/search/repositories?q=${lang}&sort=stars&order=desc`
    )
      .then((res) => res.json())
      .then((repos) => {
        setRepos(repos);
        setError(null);
        console.log(repos);
      })
      .catch((err) => {
        console.log(err);
        setError("there was an error fetching new repositories");
      });
  }
  function isLoading() {
    return repos === null && error === null;
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
      {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
    </>
  );
}

export default Popular;
