import {View,Text} from 'react-native';
import{Card} from 'react-native-paper';
import TextLabel from '../CustomComponents/TextLabel';

export default function Notification({title,dateAssigned}){
    console.log("from notification")
    return(
    <View>
        <Card>
            <Card.Content>
                <TextLabel label="Title" value={title}/>
                <TextLabel label="DateAssigned" value={dateAssigned}/>
            </Card.Content>
        </Card>
    </View>
)
}