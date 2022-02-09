import { getPreferenceValues } from '@raycast/api'

interface Preferences {
    name: string;
    bodyWeight?: string;
    bodyHeight?: string;
}

export default async () => {
    const preferences: Preferences = getPreferenceValues();
    console.log(preferences);
};