const apiEndpoints = {
    /**
     *
     */
    geocoding: (q: string) =>
        `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1`,
};

export default apiEndpoints;
