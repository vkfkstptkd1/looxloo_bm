package bm.bmthird.service;

import bm.bmthird.Dto.ProductDto;
import bm.bmthird.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly=true)
@RequiredArgsConstructor
public class ProductService {
    private final ProductMapper productMapper;

   /* @Transactional
    public void saveProduct(){
*//*

        ProductDto productDto = new ProductDto();
        productDto.setPtype("가방");
        productDto.setProduct_name("곰돌이 가방");
        productDto.setShort_info("행복한 곰돌이 가방입니다. ");
        productDto.setPrice(50000);
        productDto.setStockQuantity(5000);
        productDto.setScore(100);
        productDto.setIdx("https://scontent.cdninstagram.com/v/t51.2885-15/308105611_411720954427570_2951493984884084649_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=yzazZbSnJMIAX8h7peE&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AT8GQkgzPwF5sd86xzHnAkZ_BzLTtTHn21Vai0Y7yecL0A&oe=632FD45B");

*//*

        productMapper.save(productDto);
    }*/

    //상품 모두 조회
    public List<ProductDto> findItems(){
        return productMapper.findAll();
    }

    //update click count

    //public ProductDto updateclickcount(ProductDto productDto)
    public void updateclickcount(Long product_id)
    {/*
        System.out.println("Before");
        System.out.println(productDto.getClick_count());

        int cnt= productDto.getClick_count()+1;
        productDto.setClick_count(cnt);*/
        productMapper.update(product_id);

       /* System.out.println("After");
        System.out.println(productDto.getClick_count());
        System.out.println(cnt);
*/

        //return productDto;
    }

    //상품 하나 조회
    public ProductDto findOne(Long productid){
        return productMapper.findOne(productid);
    }
}
