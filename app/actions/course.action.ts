'use server';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCourses(query?: string) {
    try {
        const url = query ? `${API_URL}/courses?${query}` : `${API_URL}/courses`;
        const response = await fetch(url, {
            next: { tags: ['courses'] },
        });

        if (!response.ok) {
            return { error: 'Failed to fetch courses' };
        }

        const result = await response.json();

        return result.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        return { data: [], count: 0 };
    }
}

export async function getCourseById(id: string) {
    try {
        const response = await fetch(`${API_URL}/courses/${id}`, {
            next: { tags: [`course-${id}`] },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
}

export async function getFeaturedCourses() {
    try {
        const response = await fetch(`${API_URL}/courses/featured`, {
            next: { tags: ['featured-courses'] },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch featured courses');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching featured courses:', error);
        return [];
    }
}