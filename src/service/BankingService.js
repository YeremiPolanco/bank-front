import axios from "axios";

const BANKING_BASE_REST_API_URL = "http://localhost:8080/api/accounts";


class BankingService{
    static getAllAccounts() {
        return axios.get(BANKING_BASE_REST_API_URL);
    }

    static deposit(id, amount) {
        return axios.post(`${BANKING_BASE_REST_API_URL}/deposit/${id}`, { amount }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static withdrawal(id, amount) {
        return axios.post(`${BANKING_BASE_REST_API_URL}/withdrawal/${id}`, { amount }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default BankingService;