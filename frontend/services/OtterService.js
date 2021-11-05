class OtterService {

    constructor() {
        this.URI = `/api/otters`;
    }

    async getOtters() {
        const response = await fetch(this.URI);    
        const otters = await response.json();
        return otters;
    }

    async postOtter(otter) {
        const res = await fetch(this.URI, {
            method: 'POST',
            body: otter
        });
        const data = await res.json();
    }

    async deleteOtter(otterId) {
        const res = await fetch(`${this.URI}/${otterId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'Delete'
        });
        const data = await res.json();
    }

}

export default OtterService;