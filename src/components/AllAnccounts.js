import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import BankingService from "../service/BankingService";

export const AllAnccounts = () => {
    const [anccounts, setAnccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [anccountsPerPage] = useState(5);

    useEffect(() => {
        allAnccounts();
    }, []);

    const allAnccounts = () => {
        BankingService.getAllAccounts()
            .then(response => {
                setAnccounts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const indexOfLastAnccounts = currentPage * anccountsPerPage;
    const indexOfFirstAnccounts = indexOfLastAnccounts - anccountsPerPage;
    const currentAnccounts = anccounts.slice(indexOfFirstAnccounts, indexOfLastAnccounts);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDeposit = async (id) => {
        const { value: amount, isDismissed } = await Swal.fire({
            title: "Ingrese el monto a depositar",
            input: "text",
            inputLabel: "Monto",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || isNaN(value) || Number(value) <= 0) {
                    return "Por favor ingrese un monto válido";
                }
            }
        });

        if (isDismissed) {
            Swal.fire({
                icon: "warning",
                title: "Acción cancelada",
                text: "Al parecer cancelaste :(",
            });
        } else if (amount) {
            BankingService.deposit(id, Number(amount))
                .then(response => {
                    Swal.fire("Depósito exitoso!", "", "success");
                    allAnccounts(); // Actualiza la lista de cuentas después del depósito
                })
                .catch(error => {
                    Swal.fire("Error al realizar el depósito", error.message, "error");
                });
        }
    };

    const handleWithdrawal = async (id, balance) => {
        const { value: amount, isDismissed } = await Swal.fire({
            title: "Ingrese el monto a retirar",
            input: "text",
            inputLabel: "Monto",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value || isNaN(value) || Number(value) <= 0) {
                    return "Por favor ingrese un monto válido";
                }
                if (Number(value) > balance) {
                    return "Fondos insuficientes";
                }
            }
        });

        if (isDismissed) {
            Swal.fire({
                icon: "warning",
                title: "Acción cancelada",
                text: "Al parecer cancelaste :(",
            });
        } else if (amount) {
            BankingService.withdrawal(id, Number(amount))
                .then(response => {
                    Swal.fire("Retiro exitoso!", "", "success");
                    allAnccounts(); // Actualiza la lista de cuentas después del retiro
                })
                .catch(error => {
                    Swal.fire("Error al realizar el retiro", error.message, "error");
                });
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>BCP (Banco de Crédito de PolanCode)</h2>
            <div className="table-responsive">
                <table className='table table-bordered table-striped'>
                    <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Account holder name</th>
                        <th>Balance</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentAnccounts.map(anccount => (
                        <tr key={anccount.id}>
                            <td>{anccount.id}</td>
                            <td>{anccount.accountHolderName}</td>
                            <td>S/. {anccount.balance}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => handleDeposit(anccount.id)}>Deposit</button>
                                &nbsp;&nbsp;
                                <button className='btn btn-warning' onClick={() => handleWithdrawal(anccount.id, anccount.balance)}>Withdraw</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <nav>
                <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(anccounts.length / anccountsPerPage)).keys()].map(number => (
                        <li key={number + 1}>
                            <button onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AllAnccounts;
