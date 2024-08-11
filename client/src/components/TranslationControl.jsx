function TranslationControl({ id, translationPair, language, onChange }) {
  return (
    <div>
      <label htmlFor={`${language}-${id}`}>{language}:</label>
      <input
        type="text"
        id={`${language}-${id}`}
        value={translationPair[language]}
        onChange={onChange}
      />
    </div>
  );
}

export default TranslationControl;
