class ResponseError extends Error {
  constructor(endpoint: string, statusCode: number) {
    super();

    this.name = 'ResponseError';
    this.message = `Error contacting [${endpoint}], responded with ${statusCode}`;
  }

  log() {
    console.error(this.message);
  }
}

export { ResponseError };
