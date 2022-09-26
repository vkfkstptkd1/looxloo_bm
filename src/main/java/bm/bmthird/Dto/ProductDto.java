package bm.bmthird.Dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProductDto {
    private String ptype;
    private String idx;
    private Long product_id;
    private String product_name;
    private String short_info;
    private int price;
    private int stockQuantity;
    private int click_count;
    private int search_count;
    private int score;
}
