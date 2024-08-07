export default async function imageRequest() {
    const result = await fetch(
      `https://api.pexels.com/v1/search?query=Nature&per_page=8&page=1`,
        {
          headers: {
            Authorization: 'fEdd3dOlaQn3a9ZTJy8jG5iAZNZEhiwYqcnh4MrouRygOrhUI11zBK92',
          },
        },
      )
    return result.json();
}