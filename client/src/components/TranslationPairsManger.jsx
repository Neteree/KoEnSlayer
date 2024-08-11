import React, { useState } from "react";
import TranslationControl from "./TranslationControl";

function TranslationPairsManager({ translationPairs, setTranslationPairs }) {
  const [translationPairsVariant, setTranslationPairsVariant] =
    useState(translationPairs);

  const [translationPairMaster, setTranslationPairMaster] = useState({
    korean: "",
    english: "",
  });

  const addTranslationPair = async () => {
    const response = await fetch(
      "https://localhost:7245/api/TranslationPairs",
      {
        method: "POST",
        headers: {
          "Content-Type": "   application/json",
        },
        body: JSON.stringify(translationPairMaster),
      }
    );

    const addedTranslationPair = await response.json();
    setTranslationPairsVariant([
      ...translationPairsVariant,
      addedTranslationPair,
    ]);
    setTranslationPairs([...translationPairs, addedTranslationPair]);
  };

  const updateTranslationPair = async (translationPairVariant) => {
    await fetch(
      `https://localhost:7245/api/translationpairs/${translationPairVariant.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          korean: translationPairVariant.korean,
          english: translationPairVariant.english,
        }),
      }
    );

    setTranslationPairs(
      translationPairs.map((translationPair) =>
        translationPair.id === translationPairVariant.id
          ? translationPairVariant
          : translationPair
      )
    );
  };

  const deleteTranslationPair = async (id) => {
    await fetch(`https://localhost:7245/api/translationpairs/${id}`, {
      method: "delete",
    });

    setTranslationPairsVariant(
      translationPairsVariant.filter(
        (translationPair) => translationPair.id !== id
      )
    );

    setTranslationPairs(
      translationPairs.filter((translationPair) => translationPair.id !== id)
    );
  };

  return (
    <>
      <div>
        {Object.keys(translationPairMaster).map((language) => {
          return (
            <TranslationControl
              key={`${language}-master`}
              id="master"
              translationPair={translationPairMaster}
              language={language}
              onChange={(event) =>
                setTranslationPairMaster({
                  ...translationPairMaster,
                  [language]: event.target.value,
                })
              }
            />
          );
        })}

        <button onClick={() => addTranslationPair()}>Add</button>
      </div>

      {translationPairsVariant.map((translationPairVariant) => (
        <div key={translationPairVariant.id}>
          {Object.keys(translationPairMaster).map((language) => {
            return (
              <TranslationControl
                key={`${language}-${translationPairVariant.id}`}
                id={translationPairVariant.id}
                translationPair={translationPairVariant}
                language={language}
                onChange={(event) =>
                  setTranslationPairsVariant(
                    translationPairsVariant.map((translationPair) =>
                      translationPair.id === translationPairVariant.id
                        ? { ...translationPair, [language]: event.target.value }
                        : translationPair
                    )
                  )
                }
              />
            );
          })}

          <button onClick={() => updateTranslationPair(translationPairVariant)}>
            Update
          </button>
          <button
            onClick={() =>
              translationPairs.length > 1 &&
              deleteTranslationPair(translationPairVariant.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default TranslationPairsManager;
