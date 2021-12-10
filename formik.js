/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 22/11/2021 - 10:56:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/11/2021
    * - Author          : 
    * - Modification    : 
**/
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../../../layouts/Dashboard";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Imageuploader from "../../../components/Imageuploader";
import { initialValues } from "./validator/addproductValidation";
import Editprice from "./addProduct/Editprice";
import GeneralInformation from "./addProduct/GeneralInformation";
import Product_and_SKU from "./addProduct/Product_and_SKU";
import Description_or_Inst from "./addProduct/Description_or_Inst";
import Shipping_details from "./addProduct/Shipping_details";
import swal from "sweetalert";
import api from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addNewVacuhers } from "../../../services/Redux/Action/Seller_action";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { error } from "winston";

export default function SellerProductsCreate() {
  const dispatch = useDispatch()
  // const productData = useSelector(state => state.addProduct)
  // console.log(productData, "productss");

  const [atwarehouse, setatWarehouse] = useState(false)
  const [express, setExpress] = useState(false)
  const [pickup, setPickup] = useState(false)
  const [standrad, setStandrad] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [fullfilled, setFullfilled] = useState(false)
  const [afterpercentagePrice, setafterpercentagePrice] = useState("")
  const [salevalue,setsalevalue]=useState()
  const [discountvalue ,setdiscountvalue]=useState()
  const [exipre ,setexipre]=useState()
  const history = useHistory();
  const Editpriceclick = () => {
    setEPrice("show")
    // history.push("/seller/edit-price")
  }
  const [checked1, setChecked1] = useState({
    Metro: false, Nationwide: false
  })




  
  const productValidationSchema = Yup.object().shape({
    // seller_name: Yup.string()
    //   .required("Required")
    //   .min(3, "Too Short!")
    //   .max(15, "Too Long!"),
    product_name: Yup.string()
      .required("Required")
      .min(2, "Too Short !")
      .max(15, " Too Long !"),
    product_type: Yup.array()
      .required("Required")
      .min([1], "atleast select one Type"),
    product_category: Yup.array()
      .required("Required")
      .min([1], "atleast select one category"),
    product_sub_category: Yup.array()
      .required("Required")
      .min([1], "atleast select one category"),
    dimensions: Yup.object({
      dimensions_Length: Yup.number().required("Required"),
      dimensions_Width: Yup.number().required("Required"),
      dimensions_Heigth: Yup.number().required("Required"),
      dimensions_Depth: Yup.number().required("Required")
    }),
    product_weight: Yup.number().required("Required"),
    packing_dimensions: Yup.object({
      packing_length: Yup.number().required("Requried"),
      packing_width: Yup.number().required("Required"),
      packing_height: Yup.number().required("required")
    }),
    // shape:Yup.boolean().oneOf([true],"Required"),
    shape: Yup.object({
      circle: Yup.boolean().oneOf([true, false], "Required"),
      rectangle: Yup.boolean().oneOf([true, false], "Required"),
      square: Yup.boolean().oneOf([true, false], "Required")
    }),
    product_SKU: Yup.string()
      .required("Required")
      .min(3, "Too Short!")
      .max(15, "Too Long!"),
    product_stocks: Yup.string()
      .required("Required")
      .min(3, "Too Short!")
      .max(15, "Too Long!"),
    //  tags: Yup.array().min("Required"),
    seller_price: Yup.number().required("Required"),
    price: Yup.object({
      effectivityDate: Yup.date().required("Please select your Date"),
      regularPrice: Yup.string().required("Required"),
      sale: Yup.boolean().oneOf([true, false], "Required"),
      with_Expiration: Yup.boolean().when("sale", {
        is: sale => sale === true,
        then: Yup.boolean().required("Required"),
      }),


      expiryDate: exipre =='isexpiry_true'?   Yup.date().required("Required")
      :Yup.date(),


      otherwise: Yup.date(),

      discountType: salevalue == 'value_true'? Yup.string().oneOf(["By Actual Amount", "By Percentage"]).required("Required")
      :Yup.string(),

      By_Actual_Amount: Yup.object({
        discounted_price: discountvalue == 'By_Actual_Amount' ? Yup.number().required("Required")
        :Yup.number()
      }),

      By_Percentage: Yup.object({
        percent: discountvalue == 'By_Percentage' ? Yup.number().required("Required")
        :Yup.number(),
        price: discountvalue == 'By_Percentage' ?  Yup.number().required("Required")
        :Yup.number()
        })

      
     
    }),
    //tags: Yup.array().min(1, "Required"),
    product_SKU_images: Yup.array().required("Required"),
    //varients: Yup.array().required("Required").min([1],"Atleast select one Varients"),
    brief_description: Yup.string().required("Required"),
    //  bulletdescription: Yup.array().of(Yup.string()).required("Required"),
    // bulleted_description: Yup.array().min([1],"Required"),
    materials: Yup.string().required("Required"),
    care_warranty: Yup.string().required("Required"),
    warranty_card: Yup.string().required("Required"),
    catalogue: Yup.string().required("Required"),
    assembly_instruction: Yup.string().required("Required"),
    same_day_delivery: Yup.boolean().oneOf[(true, false)],
    shipping: Yup.object({
      pouch_size: Yup.string().required("Required"),
      shipping_options: Yup.object({
        standard: Yup.boolean().oneOf([true], "Required"),
        metro_manila_only1: Yup.boolean().oneOf([true, false], "Required"),
        nationwide1: Yup.boolean().oneOf([true, false], "Required"),
        GMA: Yup.boolean().oneOf([true, false], "Required"),
        Island: Yup.boolean().oneOf([true, false], "Required"),
        Luzon: Yup.boolean().oneOf([true, false], "Required"),
        Mindanao: Yup.boolean().oneOf([true, false], "Required"),
        Visayas: Yup.boolean().oneOf([true, false], "Required"),
      }),
      express_metro_manila_only: Yup.boolean().oneOf([true], "Required"),
      pick_up_at_the_store: Yup.object({
        checked_at_store: Yup.boolean().oneOf([true], "Required"),
        store_comments: Yup.string().when("checked_at_store", {
          is: checked_at_store => checked_at_store == true,
          then: Yup.string().required("Required")
        }),
        otherwise: Yup.string()
      }),
      pickup_at_TNG_warehouse: Yup.boolean().oneOf([true], "Required"),
      fulfilled_by_sellers: Yup.boolean().oneOf([true], "Required"),
      fulfilled_by_seller: Yup.object({
        isfulfilled: Yup.boolean().oneOf([true, false], "Required"),
        metro_manila_only: Yup.boolean().oneOf([true, false], "Required"),
        nationwide: Yup.boolean().oneOf([true, false], "Required")
      })
    }),
    tax: Yup.object({
      tax_status: Yup.boolean().oneOf[(true, false)],
      tax_percentage: Yup.number().when("tax_status", {
        is: tax_status => tax_status == false,
        then: Yup.number().required("Required")
      }),
      otherwise: Yup.string()
    })
  });

  const [tags, setTags] = useState([])
  const [description, setDescription] = useState([]);
  const [varient, setVarient] = useState({
    values: [], color: [], images: [], stocks: "", sku_price: "", seo_title: "", seo_description: "", seo_tags: [],
  })

  const [state, setState] = useState({
    // selectedValue: null,
    selectedTypeValue: null,
    selectedCategoryvalue: null,
    selectedSub_categoryvalue: null
    // selectedValue:null,
  })

  const options = [
    { value: "product1", label: "product1" },
    { value: "product2", label: "product2" },
    { value: "product3", label: "product3" },
    { value: "product4", label: "product4" },
  ]
  const Types = [
    { value: "Type1", label: "Type1" },
    { value: "Type2", label: "Type2" },
    { value: "Type3", label: "Type3" },
    { value: "Type4", label: "Type4" },
  ]
  const categoryOptions = [
    { value: "category1", label: "category1" },
    { value: "category2", label: "category2" },
    { value: "category3", label: "category3" },
    { value: "category4", label: "category4" },
  ]
  const subCategoryOptions = [
    { value: "subCategory2", label: "subCategory2" }
  ]

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [EPrice, setEPrice] = useState("hide")
  const [inputList, setInputList] = useState("")
  const [descritionInput, setDescriptionInput] = useState("")

  const addtagsDiv = () => {
    setVarient(pre => ({ values: [...pre.values, ""], color: [...pre.color, ""], images: [...pre.images, ''], stocks: [...pre.stocks, ""], price: [...pre.sku_price, ""], seo_tags: [...pre.seo_tags, ""], seo_title: [...pre.seo_title, ""], seo_description: [...pre.seo_description, ""] }))
  }
  const handleTaginput = (e) => {
    setInputList(e.target.value)
  }

  const deletetagItem = (index) => {
    console.log("tags", tags, index);
    tags.splice(index, 1)
    setTags([...tags])
  }

  const ItemDisplay = () => {
    return tags.map((item, index) => {
      return <li key={index} className="li-list">{item}
        <i onClick={() => { deletetagItem(index) }} className="icon ni ni-cross closebtn"></i>
      </li>
    })
  }
  const Tagdivadd = () => {
    setTags(pre => ([...pre, inputList]))
    setInputList("")
  }
  const handleDesinput = (e) => {
    setDescriptionInput(e.target.value)
  }
  const deletetagItem1 = (index) => {
    console.log("Des", description, index)
    description.splice(index, 1)
    setDescription([...description])

  }
  const ItemDisplayDec = () => {
    return description.map((item, index) => {
      return <li key={index} className="li-list">{item}
        <i onClick={() => { deletetagItem1(index) }} className="icon ni ni-cross closebtn"></i>
      </li>
    })
  }
  const Desdivadd = () => {
    setDescription(pre => ([...pre, descritionInput]))
    setDescriptionInput("")
  }

  const [myList, setmyList] = useState([{ SKU: "", color: "", images: [], stocks: "", sku_price: "", seo_title: "", seo_description: "", seo_tags: [], checked: false, }]);
  const [flags, setFlags] = useState([{ flags: "", checked: false }])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...myList];
    list[index][name] = value;
    setmyList([...list]);
  };
  console.log("jghjghjghjgjhgjhghjg ", myList);

  const handleRemoveClick = index => {
    const list = [...myList];
    list.splice(index, 1);
    setmyList([...list]);
  };

  const handleAddClick = (values) => {
    console.log("AddClick", values);
    setmyList([
      ...myList,
      { SKU: "", color: "", images: [], stocks: "", sku_price: "", seo_tags: [], seo_title: "", seo_description: "", checked: false },
    ]);
    console.log(myList);
  };


  const [title, setTitle] = useState("Add Product")
  const createUI = (values, setFieldValue) => {
    return myList.map((el, i) =>
      // <Formik>
      <div className="dynamicDiv row" key={i}>


        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">

            <div class="Switch_class"><div class="switchBoxSingle">
              <BootstrapSwitchButton
                onChange={(e) => {
                  const list = [...myList];
                  list[i]["checked"] = e;
                  setmyList([...list])
                  // setFieldValue([...values]);
                }}
                checked={myList[i].checked}
                onlabel=''
                offlabel=''
              // className="form-control col-sm-2"
              />
            </div>
            </div>
            <div className="form-group">
              <input className="form-control  " type="text" value={el.SKU || ''} name="SKU" placeholder="SKU code" onChange={e => handleInputChange(e, i)} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="colorpicker">
              <input type="color" name="color" value={el.color || ""} className="colorpickerinput" onChange={(e) => { handleInputChange(e, i) }} />
            </div>
            <div className="form-group">
              <input className="form-control " placeholder="Color/Varient" type="text" value={el.color || ''} name="color" onChange={e => handleInputChange(e, i)} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="form-group">
              <label >stoks</label>
              <input className="form-control " type="text" placeholder="Stock" min="1" name="stocks" value={el.stocks || ""} onChange={e => handleInputChange(e, i)} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="form-group">
              <label>price</label>
              <input type="number" className="form-control " placeholder="price" name="sku_price" value={el.sku_price || ""} onChange={e => handleInputChange(e, i)} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="form-group">
              <label>seo title</label>
              <input type="text" className="form-control " placeholder="seo_title" name="seo_title" value={el.seo_title || ""} onChange={(e) => { handleInputChange(e, i) }} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="form-group">
              <label>Meta Tag</label>
              <input type="text" className="form-control " placeholder="seo_tags" name="seo_tags" value={el.seo_tags || ""} onChange={(e) => { handleInputChange(e, i) }} />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4">
            <div className="form-group">
              <label>Description</label>
              <textarea type="text" className="form-control " placeholder="seo_decs" name="seo_description" value={el.seo_description || ""} onChange={(e) => { handleInputChange(e, i) }} />
            </div>
          </div>
        </div>


        <i onClick={() => handleRemoveClick(i)} className="icon ni ni-cross closebtn"></i>
        <Imageuploader index={2} listIndex={i} values={values} myList={myList} setmyList={setmyList} />
      </div>
      // </Formik>
    )
  }

  async function onSubmit(values, { resetForm }) {
    const sellerName = JSON.parse(localStorage.getItem('opencommerce.user'))
    values.seller_name = sellerName.sellerName
    values.tags = tags
    values.varient = myList
    values.bulleted_description = description
    dispatch(addProduct(values))
  console.log(values,'values')
    resetForm()
  }



  useEffect(() => {
    if(salevalue == 'value_true'){
      console.log('yes sale value true');
    }else{
      console.log('no sale value false');
    }

  

  
  }, [salevalue])

  useEffect(() => {
    ///////////////////////////////////////////////
    if(discountvalue == 'By_Percentage'){
      console.log(' discount by By_Percentage');
    }else if(discountvalue == 'By_Actual_Amount'){
      console.log(' discount by By_Actual_Amount');
    }else{
      console.log('no validation on  price or actual amount');
    }
   
  }, [discountvalue])

  useEffect(() => {
      /////////////////////////////////////////////////

      if(exipre == 'isexpiry_true'){
        console.log('yes sale isexpiry true');
      }else{
        console.log('no sale isexpiry false');
      }
  }, [exipre])

  const myfunc=()=>{
    /////////////////////////////
    /////sale /////////////
   
    let sal=localStorage.getItem('sale');
    console.log('gdghfhjfdjf,sdvsdfvbfsdvb');
    // const valll=JSON.parse(sal)
    console.log(sal);
    setsalevalue(sal)

    ///////////////////////////////////
    ////////////discount_type///////////
    let discount=localStorage.getItem('discount');
    console.log(discount);
    setdiscountvalue(discount)
    ////////////////////////////////////////////
    //////////////expire /////////////////////
    let expee=localStorage.getItem('isexpiry');
    console.log(expee);
    setexipre(expee)



  }

  const onnsubmit =(values ,errors)=>{
    console.log("Form Submit ", values);
    console.log("Form Submit err ", errors);

    localStorage.setItem(
      "product",
      JSON.stringify(values)
    );

  }
  return (

    <Dashboard title={title}>
      <div className="card-inner">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={productValidationSchema}
        >
          {({ handleSubmit, setFieldValue, values, errors, isValid }) => {
            if (values.price.By_Percentage.percent.length > 1)
              setafterpercentagePrice((values.price.regularPrice - ((values.price.regularPrice) * (values.price.By_Percentage.percent)) / 100))
            return (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // handleSubmit();
                   
                  }}
                >{/*              
                {JSON.stringify(errors, null, 2)}*/}
                  {console.log('errors ', errors)}

                  {EPrice == "hide" && (
                    <div>


                    
                      <Tabs defaultActiveKey="gernalinformation"
                        id="uncontrolled-tab-example"
                        className="mb-3">
                        <Tab eventKey="gernalinformation" title="Gernal Information">
                          <GeneralInformation
                            setFieldValue={setFieldValue}
                            values={values}
                            Editpriceclick={Editpriceclick}
                            Types={Types}
                            Tagdivadd={Tagdivadd}
                            inputList={inputList}
                            handleTaginput={handleTaginput}
                            ItemDisplay={ItemDisplay}
                            setState={setState}
                            state={state}
                            categoryOptions={categoryOptions}
                            subCategoryOptions={subCategoryOptions}
                          />
                        </Tab>







                        <Tab eventKey="price" title="Edit Price">
                          <Editprice
                            setFieldValue={setFieldValue}
                            title={title}
                            setTitle={setTitle}
                            setEPrice={setEPrice}
                            EPrice={EPrice}
                            afterpercentagePrice={afterpercentagePrice}
                          />
                        </Tab>
                        <Tab eventKey="product$sku" title="Product & SKU">
                          <Product_and_SKU
                            myList={myList}
                            setmyList={setmyList}
                            addtagsDiv={addtagsDiv}
                            createUI={createUI}
                            handleAddClick={handleAddClick}
                          />
                        </Tab>
                        <Tab
                          eventKey="description"
                          title="Description and Instruction's"
                        >
                          <Description_or_Inst
                            values={values}
                            setFieldValue={setFieldValue}
                            Desdivadd={Desdivadd}
                            ItemDisplayDec={ItemDisplayDec}
                            handleDesinput={handleDesinput}
                            descritionInput={descritionInput}
                          />
                        </Tab>
                        <Tab eventKey="Shipping" title="Shipping Details">
                          <Shipping_details
                            values={values}
                            cx={cx}
                            setFieldValue={setFieldValue}
                            setStandrad={setStandrad}
                            standrad={standrad}
                            express={express}
                            setPickup={setPickup}
                            setExpress={setExpress}
                            pickup={pickup}
                            atwarehouse={atwarehouse}
                            setatWarehouse={setatWarehouse}
                          />
                        </Tab>
                      </Tabs>
                    </div>
                  )}
                  <div className="form-group mt-3 float-right mb-3 ">
                    <button className="btn btn-primary mr-2" type="submit" onClick={() => { 

                      myfunc()
                    console.log('hjfsbsfbhsdgfbsdgbsdgfsdhgbsdgbd')
                    console.log(isValid)

                    if(isValid == false){
                      onnsubmit(values,errors)
                    }else{
                      swal({
                         title: "Plz fill All field ",
                       text: "Plz fill all field  ",
                       icon: "Failed"
                   })

                    }

                      handleSubmit()
                      
                       }}>
                      Save Product
                  </button>
                    <Link
                      to="/seller/products/myProducts"
                      className="btn btn-danger mr-2"
                    >
                      Cancel
                  </Link>
                  </div>
                </form>
              </>
            )
          }}
        </Formik>
      </div>
    </Dashboard>

  );
}





///////////////////////////////////////////////////////////////////////////////

/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 06/12/2021 - 18:00:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/12/2021
    * - Author          : 
    * - Modification    : 
**/
import Pagination from "@material-ui/lab/Pagination";
import { json } from "body-parser";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { ErrorMessage, Form, Formik, isObject } from "formik";
import { useState , useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../../components/input";
import Dashboard from "../../../../layouts/Dashboard";
import productValidationSchema, { initialValues } from "../validator/addproductValidation";

const Editprice = ({ setEPrice, EPrice, setTitle, setFieldValue, afterpercentagePrice}) => {
  const history = useHistory();
  const [isexpiry, setIsExpiry] = useState(false);
  const [sale, setsale] = useState(false);
  const handleClose = () => {
    setTitle("Add Product")
    setEPrice("hide")
    // history.goBack();
  };
  const [discountType, setDiscountType] = useState("By Percentage");
  const handleSelect = (e) => {
    setDiscountType(e.target.value);
  };


  useEffect(() => {
   // console.log('sale is at run');
    if(sale==true){
      console.log('yes sale is true');
      localStorage.setItem('sale','value_true')
    }
    if(sale==false){
      localStorage.setItem('sale','value_false')
      localStorage.setItem('isexpiry','isexpiry_false')
      localStorage.setItem('discount', '')
      console.log('no sale is false');
    }
    
  }, [sale])


  useEffect(() => {
    // console.log('sale is at run');
     if(isexpiry==true){
       console.log('yes isexpiry is true');
       localStorage.setItem('isexpiry','isexpiry_true')
     }
     if(isexpiry==false){
       localStorage.setItem('isexpiry','isexpiry_false')
       //localStorage.setItem('discount', '')
       console.log('no isexpiry is false');
     }
     
   }, [isexpiry])
  return (
    <div className="iq-card">
      <div className="iq-card-body">
        <h6 className="heading">Price</h6>
        <hr className="line" />
        <div className="">
          <div className="form group">
            <label>Effectivity Date</label>
            <Input
              className="form-control"
              type="date"
              id="price.effectivityDate"
              name="price.effectivityDate"
            />

            <br />
            <Input
          id="seller_price"
          name="seller_price"
          label="Price"
          placeholder="Enter Price here"
        />
        <br/>
            <label>Regular Price</label>
            <Input
              id="price.regularPrice"
              name="price.regularPrice"
              className="form-control"
              type="text"
              placeholder="Regular Price"
            />
            <br />
            <div className="Switch_class">
              <div className="switchBoxSingle">
                <label id="same_day">Sale</label>
                <BootstrapSwitchButton
                  onlabel=""
                  offlabel=""
                  checked={sale}
                  onChange={(e) => {
                    console.log(e);
                    setsale((pre) => !pre);
                    setFieldValue("price.sale", !sale);
                   
                    
                    
                  }}
                />
              </div>
            </div>
            <br />
            {sale ? <>
              <input
                type="checkbox"
                className="checkbox"
                checked={isexpiry}
                onChange={(e) => {
                  if(sale == true){
                    setIsExpiry((pre) => !pre);
                  setFieldValue("price.with_Expiration", !isexpiry);

                  }else{
                  setIsExpiry(false);
                  setFieldValue("price.with_Expiration", false);

                  }
                  
                }}
              />
              <label>With Expiration</label>
              <ErrorMessage
                name="price.with_Expiration"
                component="div"
                className="text-danger"
              />
              <br />
              {isexpiry ? (
                <>
                  <label>Expiry Date</label>
                  <Input
                    id="price.expiryDate"
                    name="price.expiryDate"
                    className="form-control"
                    type="date"
                    placeholder="expiry date"
                  />
                </>
              ) : (
                  ""
                )}
              <br />

              
              <label>Discount Type</label>
              <select
                id="price.discountType"
                name="price.discountType"
                className="form-control"
                onChange={(e) => {
                  handleSelect(e);
                 
                  //setFieldValue("price.discountType", e.target.value);


                  if (e.target.value == "By Actual Amount" && sale ==true ) {
                    localStorage.setItem('discount', 'By_Actual_Amount')
                    setFieldValue("price.discountType", "By_Actual_Amount");
                    setFieldValue("price.By_Percentage.percent", "");
                    setFieldValue("price.By_Percentage.price", "");
                  }
                  if (e.target.value == "By Percentage" && sale == true) {
                    localStorage.setItem('discount', 'By_Percentage')
                    setFieldValue("price.discountType",'By_Percentage');
                    setFieldValue("price.By_Actual_Amount.discounted_price", "");
                    
                  }
                  
                  if(sale==false){
                    setFieldValue("price.discountType", "");
                    setFieldValue("price.By_Actual_Amount.discounted_price", "");
                    setFieldValue("price.By_Percentage.percent", "");
                    setFieldValue("price.By_Percentage.price", "");

                  }

                }}
              >
                <option value='' selected >
                  Select...
              </option>
                <option value="By Percentage">By Percentage</option>
                <option value="By Actual Amount" >
                  By Actual Amount
              </option>

              </select>
              {
                sale?(
                 console.log('yess')
                ):(
                  console.log('hhhhhgfvsdghs')
                )
              }
              <ErrorMessage
                name="price.discountType"
                component="div"
                className="text-danger"
              />
              <br />
              <label>
                {discountType}
                {discountType == "By Percentage" && "(%)"}
              </label>
              {discountType == "By Actual Amount" && (

                <Input
                  id="price.By_Actual_Amount.discounted_price"
                  name="price.By_Actual_Amount.discounted_price"
                  className="form-control"
                  type="text"
                  placeholder="Discounted Price"
                />
              )}
              {discountType == "By Percentage" && (
                <div className="Inputdiv">
                  <Input
                    id="price.By_Percentage.percent"
                    name="price.By_Percentage.percent"
                    className="form-control"
                    type="text"
                    placeholder="Percent"

                  />
                  <Input
                    id="price.By_Percentage.price"
                    name="price.By_Percentage.price"
                    className="form-control"
                    placeholder="price"
                    value={afterpercentagePrice}
                    type="text"
                  />
                </div>
              )}

            </> : ""}
          </div>
        </div>
        <hr className="line" />
      </div>
    </div>
  );
};
export default Editprice;























