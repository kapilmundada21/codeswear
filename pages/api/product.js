import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let productById;
        try {
            productById = await Product.findOne({ _id: req.body.id })
        } catch (error) {
            res.status(200).json({ sucess: false, error: 'Product not found!' })
            return
        }

        if (productById) {
            if (req.body.searchbyid) {
                res.status(200).json({ sucess: true, product: productById })
                return
            }
            if (req.body.updatebyid) {
                let p = await Product.findByIdAndUpdate({ _id: req.body.id }, {
                    title: req.body.title,
                    slug: req.body.slug,
                    desc: req.body.description,
                    img: req.body.imgurl,
                    category: req.body.category,
                    size: req.body.size,
                    color: req.body.color,
                    price: req.body.price,
                    availableQty: req.body.availableQty
                })
                await p.save()
                res.status(200).json({ sucess: true })
                return
            }
            if (req.body.deletebyid) {
                let p = await Product.deleteOne({ _id: req.body.id })
                res.status(200).json({ sucess: true })
                return
            }
        }
        else{
            res.status(200).json({ sucess: false, error: 'Product not found!' })
            return
        }
    }
    else {
        res.status(200).json({ sucess: true, error: "This method is not allowed" })
        return
    }
}
export default connectDb(handler);