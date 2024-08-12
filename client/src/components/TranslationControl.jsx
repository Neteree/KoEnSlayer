function TranslationControl({ id, translationPair, language, onChange }) {
  return (
    <div>
      <label htmlFor={`${language}-${id}`}>{language}: </label>
      <input
        className="input"
        type="text"
        id={`${language}-${id}`}
        value={translationPair[language]}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
}

export default TranslationControl;
