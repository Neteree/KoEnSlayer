namespace KoEnAPI.Models.Entities
{
    public class TranslationPair
    {
        public Guid Id { get; set; }
        public required string Korean { get; set; }
        public required string English { get; set; }
    }
}
