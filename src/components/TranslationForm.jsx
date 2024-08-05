import "./TranslationForm.css";

function TranslationForm({
  translationInput,
  setTranslationInput,
  setIsInCombat,
}) {
  const handleTranslation = (event) => {
    setTranslationInput(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setIsInCombat(true);
      }}
    >
      <div className="translation-box">
        <label className="translation-label" htmlFor="translation">
          Translation Input:
        </label>
        <input
          id="translation"
          type="text"
          value={translationInput}
          onChange={handleTranslation}
          autocomplete="off"
          required
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default TranslationForm;
