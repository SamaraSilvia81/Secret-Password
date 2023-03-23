import { useNavigate  } from 'react-router-dom'
import { ProjectForm } from '../project/ProjectForm'
import styles from './NewProject.module.css'

export function NewProject(){

    const navigate = useNavigate()

    function createPost(project){

        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
            // redirect
            navigate('/projects',{state:{ message:'Projeto criado com sucesso!'}})
            console.log(data)
        })
        .catch((e) => console.log(e))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Cadastrar Produto</h1>
            <p>Crie seu produto para depois calcular o orçamento</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
        </div>
    )
}