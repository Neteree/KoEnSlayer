import "./TranslationForm.css";

function TranslationForm({
  translationInput,
  setTranslationInput,
  setIsInCombat,
}) {
  const handleTranslationInput = (event) => {
    setTranslationInput(event.target.value);
  };

  const handleTranslationInputSubmission = (event) => {
    event.preventDefault();
    setIsInCombat(true);
  };

  return (
    <form
      className="translation-form"
      onSubmit={handleTranslationInputSubmission}
    >
      <div className="translation-box">
        <label className="translation-label" htmlFor="translation-input">
          Translation Input:{" "}
        </label>
        <input
          className="input"
          id="translation-input"
          type="text"
          value={translationInput}
          onChange={handleTranslationInput}
          autoComplete="off"
          required
        />
      </div>
      <button className="button" type="submit">
        submit
      </button>
    </form>
  );
}

export default TranslationForm;
