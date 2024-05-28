import './category-item.styles.scss';

const CaregoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    return (
        <div className="category-container">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})` //allows using a string inside another string
            }}/>
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now </p>
            </div>
        </div>
    );
};

export default CaregoryItem