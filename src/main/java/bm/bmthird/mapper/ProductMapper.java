package bm.bmthird.mapper;

import bm.bmthird.Dto.ProductDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    //item 저장
    void save(ProductDto productDto);

    //하나 조회
    ProductDto findOne(Long product_id);

    //전체조회
    List<ProductDto> findAll();

    void update(Long product_id);

    //재고 수정
    //void update(ProductDto productDto);
}
