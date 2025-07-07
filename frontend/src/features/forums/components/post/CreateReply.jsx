export default function CreateReply({post}) {

    const addReply = (formData) => {
        const message = formData.get("message");
        
    }

    return <form className="createReply">
        <input name="message" placeholder="Add a reply" type="text"/>
    </form>
}