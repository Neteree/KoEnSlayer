import React, { useState } from "react";

function TranslationPairsManager({ translationPairs, setTranslationPairs }) {
  const [translationPairsVariant, setTranslationPairsVariant] =
    useState(translationPairs);

  const [translationPairMaster, setTranslationPairMaster] = useState({
    korean: "",
    english: "",
  });

  const handleTranslationInputChange = (id, language, translation) => {
    setTranslationPairsVariant(
      translationPairsVariant.map((translationPair) =>
        translationPair.id === id
          ? { ...translationPair, [language]: translation }
          : translationPair
      )
    );
  };

  const addTranslationPair = async () => {
    const response = await fetch(
      "https://localhost:7245/api/TranslationPairs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        <div>
          <label htmlFor={"korean-master"}>Korean:</label>
          <input
            type="text"
            id={"korean-master"}
            value={translationPairMaster.korean}
            onChange={(event) =>
              setTranslationPairMaster({
                ...translationPairMaster,
                korean: event.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor={"english-master"}>English:</label>
          <input
            type="text"
            id={"english-master"}
            value={translationPairMaster.english}
            onChange={(event) =>
              setTranslationPairMaster({
                ...translationPairMaster,
                english: event.target.value,
              })
            }
          />
        </div>

        <button onClick={() => addTranslationPair()}>Add</button>
      </div>

      {translationPairsVariant.map((translationPairVariant) => (
        <div key={translationPairVariant.id}>
          <div>
            <label htmlFor={"korean" + translationPairVariant.id}>
              Korean:
            </label>
            <input
              type="text"
              id={"korean" + translationPairVariant.id}
              value={translationPairVariant.korean}
              onChange={(event) =>
                handleTranslationInputChange(
                  translationPairVariant.id,
                  "korean",
                  event.target.value
                )
              }
            />
          </div>
          <div>
            <label htmlFor={"english" + translationPairVariant.id}>
              English:
            </label>
            <input
              type="text"
              id={"english" + translationPairVariant.id}
              value={translationPairVariant.english}
              onChange={(event) =>
                handleTranslationInputChange(
                  translationPairVariant.id,
                  "english",
                  event.target.value
                )
              }
            />
          </div>
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
