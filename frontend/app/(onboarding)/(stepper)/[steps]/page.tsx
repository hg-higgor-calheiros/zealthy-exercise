import StepsContent from './StepsContent'

interface Step {
    id: number;
    title: string;
    path: string;
    components: string[];
}

async function fetchSteps(): Promise<Step[]> {
    const response = await fetch('https://zealthy-exercise-production.up.railway.app/steps', {
        // Disable cache to always get fresh data
        cache: 'no-store',
        next: {
            // Revalidate every 10 seconds
            revalidate: 10
        }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch steps');
    }

    return response.json();
}

// This function runs on the server at request time
export async function generateStaticParams() {
    try {
        const steps = await fetchSteps();
        
        // Map the steps to the required format, extracting the path segment after the slash
        return steps.map((step) => ({
            steps: step.path.replace('/', '')
        }));
    } catch (error) {
        console.error('Error fetching steps:', error);
        // Try fetching again in case of temporary failure
        try {
            const retrySteps = await fetchSteps();
            return retrySteps.map((step) => ({
                steps: step.path.replace('/', '')
            }));
        } catch (retryError) {
            console.error('Error retrying fetch steps:', retryError);
            // If both attempts fail, throw the error to let Next.js handle it
            throw retryError;
        }
    }
}

// This function runs on the server at request time
export default async function Page() {
    return <StepsContent />
}