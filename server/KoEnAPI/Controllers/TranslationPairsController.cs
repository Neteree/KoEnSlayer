using KoEnAPI.Data;
using KoEnAPI.Models.DTOs;
using KoEnAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KoEnAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationPairsController : ControllerBase
    {
        private readonly KoEnAPIDbContext dbContext;

        public TranslationPairsController(KoEnAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetTranslationPairs(string sortBy = "english", string sortOrder = "asc")
        {
            var translationPairs = dbContext.TranslationPairs.AsQueryable();
            bool isSortOrderDescending = sortOrder.Equals("desc", StringComparison.CurrentCultureIgnoreCase);

            translationPairs = sortBy.ToLower() switch
            {
                "korean" => isSortOrderDescending
                    ? translationPairs.OrderByDescending(translationPair => translationPair.Korean)
                    : translationPairs.OrderBy(translationPair => translationPair.Korean),
                "english" => isSortOrderDescending
                    ? translationPairs.OrderByDescending(translationPair => translationPair.English)
                    : translationPairs.OrderBy(translationPair => translationPair.English),
                _ => isSortOrderDescending
                    ? translationPairs.OrderByDescending(translationPair => translationPair.English)
                    : translationPairs.OrderBy(translationPair => translationPair.English),
            };

            return Ok(translationPairs.ToList());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetTranslationPairById(Guid id)
        {
            var translationPair = dbContext.TranslationPairs.Find(id);

            if (translationPair == null)
            {
                return NotFound();
            }

            return Ok(translationPair);
        }

        [HttpPost]
        public IActionResult AddTranslationPair(AddTranslationPairDto addTranslationPairDto)
        {
            var translationPair = new TranslationPair()
            {
                Korean = addTranslationPairDto.Korean,
                English = addTranslationPairDto.English,
            };

            dbContext.TranslationPairs.Add(translationPair);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetTranslationPairById), new { id = translationPair.Id }, translationPair);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateTranslationPair(Guid id, UpdateTranslationPairDto updateTranslationPairDto)
        {
            var translationPair = dbContext.TranslationPairs.Find(id);

            if (translationPair == null)
            {
                return NotFound();
            }

            translationPair.Korean = updateTranslationPairDto.Korean;
            translationPair.English = updateTranslationPairDto.English;

            dbContext.SaveChanges();

            return Ok(translationPair);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteTranslationPair(Guid id)
        {
            var translationPair = dbContext.TranslationPairs.Find(id);

            if (translationPair == null)
            {
                return NotFound();
            }

            dbContext.TranslationPairs.Remove(translationPair);
            dbContext.SaveChanges();

            return Ok(translationPair);
        }
    }
}
