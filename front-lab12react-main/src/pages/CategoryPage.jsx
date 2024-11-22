import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function CategoryPage() {
    const navigate = useNavigate();

    const urlApi = 'http://localhost:8000/series/api/v1/categories/'
    const [categories, setCategories] = useState([]);

    const loadData = async() => {
        const resp = await axios.get(urlApi);
        console.log(resp.data);
        setCategories(resp.data);
        }
    
    useEffect(() => {
        loadData();
    }, []);

    const gotoUrl = (codigo) => {
        navigate(`/categories/edit/${codigo}`);
    };

    const handleDeleteCategory = async (id) => {
        await axios.delete(`${urlApi}${id}/`);
        const nLista = categories.filter(item=> item.id!=id);
        setCategories(nLista);
    }

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="border-bottom pb-3 mb-3">
                    <h3>Categorías</h3>
                </div>
                    <div>
                        <Link className="btn btn-primary" to="/categories/new">Nuevo</Link>
                    </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th className="text-center">Id</th>
                            <th className="text-center" style={{ width: "100px" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item) => (
                            <tr key={item.id}>
                                <td>{item.description}</td>
                                <td className="text-center">{item.id}</td>
                                <td className="text-center">
                                    <button onClick={() => gotoUrl(item.id)} className="btn btn-secondary me-2 btn-sm">
                                    <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={()=> handleDeleteCategory(item.id)} className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}


export default CategoryPage;
