function TranslationPairsManger({ translationPairs }) {
  return (
    <>
      {translationPairs.map((e) => {
        return (
          <div key={e.id}>
            <div>
              <label htmlFor={"korean" + e.id}>korean:</label>
              <input type="text" id={"korean" + e.id} defaultValue={e.korean} />
            </div>
            <div>
              <label htmlFor={"english" + e.id}>english:</label>
              <input
                type="text"
                id={"english" + e.id}
                defaultValue={e.english}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TranslationPairsManger;
