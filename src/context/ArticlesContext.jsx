import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  // { [username]: Article[] }
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});

  const currentUsername = user?.username;

  const getUserSavedArticles = () => {
    if (!isAuthenticated() || !currentUsername) return [];
    return savedArticlesByUser[currentUsername] || [];
  };

  const saveArticle = (article) => {
    if (!isAuthenticated() || !currentUsername) return;

    setSavedArticlesByUser((prev) => {
      const existing = prev[currentUsername] || [];
      if (existing.some((a) => a.url === article.url)) return prev;

      return {
        ...prev,
        [currentUsername]: [...existing, article],
      };
    });
  };

  const removeArticle = (url) => {
    if (!isAuthenticated() || !currentUsername) return;

    setSavedArticlesByUser((prev) => {
      const existing = prev[currentUsername] || [];
      return {
        ...prev,
        [currentUsername]: existing.filter((a) => a.url !== url),
      };
    });
  };

  const isArticleSaved = (url) => {
    if (!isAuthenticated() || !currentUsername) return false;
    return (savedArticlesByUser[currentUsername] || []).some((a) => a.url === url);
  };

  // Step 7 needs this for admin
  const getAllUserArticles = () => savedArticlesByUser;

  const value = useMemo(
    () => ({
      savedArticlesByUser,
      saveArticle,
      removeArticle,
      isArticleSaved,
      getUserSavedArticles,
      getAllUserArticles,
    }),
    [savedArticlesByUser, currentUsername, isAuthenticated]
  );

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>;
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) throw new Error("useArticles must be used within ArticlesProvider");
  return context;
};