export class NetworkError implements Error {
    message: string;
    name: string;

    constructor(status: number, response: string) {
        this.name = 'NetworkError';
        this.message = `Status ${status}. Response: ${response}`;
    }
}
