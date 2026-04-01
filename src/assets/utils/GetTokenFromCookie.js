export default function GetTokenFromCookie(){
    const value = `;${document.cookie}`;
    const part =value.split(';token=');

    if(part.length === 2){
        return part.pop().split(';').shift();
    };
}