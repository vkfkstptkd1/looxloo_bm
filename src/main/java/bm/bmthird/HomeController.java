package bm.bmthird;

import bm.bmthird.Dto.ProductDto;
import bm.bmthird.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//post -insert
//get -select
//request -search



@Controller
@RequiredArgsConstructor

public class HomeController {

    private final ProductService productService;

    @RequestMapping("/")
    public String home(Model model){
        return "index";
    }

    @GetMapping("/main/gift")
    public String gift(Model model) {
        List<ProductDto> products = productService.findItems();
        /*for(int i = 0; i < products.size(); i++) {
            System.out.println(products.get(i).getIdx());
        }*/
        model.addAttribute("products", products);


        return "/main/gift";
    }

    //click count update
    @GetMapping(value = "/product/detail/{product_id}")
    public String showDetail(@PathVariable("product_id") Long product_id,Model model)
    {


        ProductDto productDto=productService.findOne(product_id);

        //System.out.println("seqTest" + productDto.getProduct_id());

        //System.out.println("BEFORE " + productDto.getClick_count());

        productService.updateclickcount(productDto.getProduct_id());

        //System.out.println("after " + productDto.getClick_count());


        /* ProductDto productDto2 =productService.findOne(product_id);

        System.out.println("after " + productDto2.getClick_count());*/

        model.addAttribute("product", productDto);
        return "/product/detail";
    }


   /* @RequestMapping("product/savetest")
    public String savetest(Model model) {
        productService.saveProduct();
        return "product/savetest";
    }*/
/*
    @RequestMapping("/member/login")
    public String login(Model model){
        return "/member/login" ;
    }*/

}
