import React, {useState, useEffect} from "react";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";


function PetStatus(props) {

    const [status, setStatus] = useState('TBD');
    const [foodData, setFoodData] = useState([]);
    const [statusImg, setStatusImg] = useState(<img />)
     
    useEffect(()=>{
        axiosWithAuth()
        .get(`/api/parents/entries/${props.childId}/month`)
        .then (res => {
            setFoodData(res.data);
        })
        .catch(error => console.log(error, "ERROR"))
    }, [])
      

    const dailyAverages = [];

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let totalAverage = null;


    // CHANGE FOODDATA ARRAY TO DYNAMIC DATA

    const getScore = foodData.map((object)=>{

        // REMOVES NULL VALUES FROM ENTRY FORM SUBMISIONS
        const nullRemover = (prop) => {
            
            Object.keys(prop).forEach(function (item) {
                return prop[item] === null ? prop[item] = 0
                    :   prop[item];
            });
        }
        nullRemover(object);

        // AVERAGES OUT THE FOOD DATA SERVINGS OBJECTS TO ONE NUMBER
        const average = (object.dairy+object.fruits+object.grains+object.proteins+object.vegetables+object.treats) / 6;           
        dailyAverages.push(average);
        const reduced = dailyAverages.reduce(reducer);
        const divider = dailyAverages.length;
        totalAverage = reduced / divider;

        totalAverage = Math.round(totalAverage);

        return  totalAverage;
    })    
    
    // SETS TOTALAVERAGE EQUEAL TO A STATUS LEVEL
    useEffect(() => {
        const getStatus = (prop) => {

            return prop > 5 ? setStatus('Excelent!')
                 : prop === 5 ? setStatus('Grrreat!')
                 : prop >= 4 ? setStatus('Above Average!')
                 : prop >= 3 ? setStatus('Average')
                 : prop >= 2 ? setStatus('Poor')
                 : prop >= 1 ? setStatus('Weak')
                 : setStatus('Very Weak');
        }

        getStatus(totalAverage);
      }, );    
      
      // SETS STATUS LEVEL EQUAL TO A PET EMOTION IMAGE
      useEffect(() => {
        const getImage = () => {

            return status === 'Excelent!' ? setStatusImg(<img src={require('../statusimages/StatusExcelent.png')} />)
                 : status === 'Grrreat!' ? setStatusImg(<img src={require('../statusimages/StatusGreat.png')} />)
                 : status === 'Above Average!' ? setStatusImg(<img src={require('../statusimages/StatusAboveAverage.png')} />)
                 : status === 'Average' ? setStatusImg(<img src={require('../statusimages/StatusAverage.png')} />)
                 : status === 'Poor' ? setStatusImg(<img src={require('../statusimages/StatusPoor.png')} />)
                 : status === 'Weak' ? setStatusImg(<img src={require('../statusimages/StatusWeak.png')} />)
                 : setStatusImg(<img src={require('../statusimages/StatusVeryWeak.png')} />);
        }

        getImage(status);
      }, ); 

    return( 
        <div>
            <p>Health is: {status} {statusImg} </p>
        </div>
    );
}

export default PetStatus;