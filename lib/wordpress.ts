export default async function getAllPosts() {
    const apiUrl = process.env.WP_API_URL ?? "https://selbu.tnjensen.com/wp/wp-json";
    const res = await fetch(`${apiUrl}/wp/v2/posts?per_page=50&_embed`, {
        next: {
            revalidate: 60,
        }
    });
    if(!res.ok) throw new Error("Failed to fetch user posts")

    return res.json()
}