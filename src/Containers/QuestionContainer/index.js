import React, { Component } from 'react';
import styles from "./QuestionContainer.module.css";



const ButtonGrid = (props) => {
    return    <button
        // value={props.correct}
        onClick={props.handleClick}
        id={props.id}
        className={`${props.checked && props.correct===true ? styles.activeBtn : styles.btn} ${props.checked && props.correct === false ? styles.redBtn : ''}`}
    >

        {props.option}
    </button>
};


class QuestionContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [
                {checked:false, id: 7, option:'5 + x = 11', correct: true,  },
                {checked:false, id: 8, option:'16 - x = 12', correct:false,  },
                {checked:false, id: 9, option:'x + 5 = 11', correct:true,  },
                {checked:false, id: 10, option:'x - 16 = 12', correct:false, },
            ],
            errorList:0,
            correctList: 0,
            isAccept:false,
            isError: false,
            showQuestion: true,
            showResult:false

        };
        this.baseState = this.state;
        this.handleClick = this.handleClick.bind(this);
        this.findCorrect = this.findCorrect.bind(this);
    }


    componentDidUpdate(prevState) {
        if(this.state.errorList > 0){
            setTimeout(() => {
                this.resetForm()
            }, 1000);

        }
        if(this.state.correctList > 1){
            setTimeout(() => {
                this.correctAnswer()
            }, 0);
            setTimeout(() => {
                this.showResult()
            }, 2000);
        }
    }



    showResult = () => {
        this.setState({
            showResult: true,
        });
    };

    correctAnswer = () => {
        this.setState({
            isAccept: true,
        });
    };

    findCorrect =(condition)=> {
        const result = this.state.data.find(e => e.id === +condition);
        if(result) {
            console.log(result)
        }
        else{
            console.log('cant find')
        }
        return result
    };

    resetForm = () => {
        this.setState(this.baseState)
    };

    handleClick = (e) => {
        // e.stopPropagation();
        const id = e.target.id;
        const result = this.findCorrect(id) ;

        this.setState(prevState => {
            return  {
                showQuestion:false,
                data: prevState.data.map(
                    item => (item.id === +id ?
                        { ...item,
                            checked: !item.value
                        } : item)
                )
            }
        });

        if(result['correct'] === true && parseInt(id, 10) === result['id']){
            this.setState({
                correctList: this.state.correctList + 1,
            });
            console.log('ADD TO ARRAY')
        }
        if(result['correct'] === false){
            this.setState({
                errorList: this.state.errorList + 1,
                isError:true
            });
            console.log('ADD TO ARRAY')
        }

        console.log(typeof result['id'])
        console.log(this.state.correctList)

    };

    render() {
        const {data} = this.state;

        const renderButtons = data.map((item)=> {
            const {id, option, correct, checked} = item;
            return (
                <ButtonGrid
                    handleClick={this.handleClick}
                    id={id}
                    option={option}
                    correct={correct}
                    checked={checked}
                />
            )
        });
        return (
            <div>

                <div className={styles.wrapper}>

                    {this.state.showResult ?
                        <p>
                            Ответ верный
                        </p>
                        :

                        <div className={styles.mainGrid}>

                            <h1>
                                Выберте все уравнения, в которых решением является число 6
                            </h1>

                            <div className={styles.btnGrid}>
                                {renderButtons}
                            </div>


                            <div className={styles.tips}>
                                {!this.state.isAccept && this.state.showQuestion ?

                                    <p>Вычисли X</p>

                                    :

                                    ''
                                }

                                {this.state.correctList === 1 ?

                                    <p>Это не все правильные ответы</p>

                                    :

                                    ''
                                }


                            </div>

                            <div className={styles.grid}>
                                <button
                                    className={`${this.state.isAccept  ? styles.acceptBtnActive : styles.acceptBtn} ${this.state.isError || this.state.correctList ===1 ? styles.redAccept : ''}`}

                                >
                                    Готово
                                </button>
                            </div>

                        </div>

                    }


                </div>
            </div>
        );
    }
}

export default QuestionContainer;