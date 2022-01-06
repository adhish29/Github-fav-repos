import React, { useEffect, useState } from "react";
import LanguageNav from "./LanguageNav";
import "../App.css";
import ReposGrid from "./ReposGrid";

function Popular() {
  const languages = ["All", "JavaScript", "React", "CSS", "Python"];

  const [language, setLanguage] = useState("All");
  const [repos, setRepos] = useState({});
  const [error, setError] = useState(null);

  // console.log(repos);

  useEffect(() => {
    if (!repos[language]) {
      // console.log("hello");
      fetch(
        `https://api.github.com/search/repositories?q=${language}&sort=stars&order=desc`
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
  }, [repos, language]);

  function updateLanguage(lang) {
    setLanguage(lang);
    setError(null);
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
      {repos[language] && <ReposGrid repos={repos[language]} />}
    </>
  );
}

export default Popular;
