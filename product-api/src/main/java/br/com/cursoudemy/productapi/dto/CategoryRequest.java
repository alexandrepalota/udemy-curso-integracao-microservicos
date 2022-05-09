package br.com.cursoudemy.productapi.dto;


import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CategoryRequest {

    @NotNull(message = "Description can't be null")
    @NotEmpty(message = "Description can't be empty")
    @Size(message = "Description length must be between 3 and 100 chars", min = 3, max = 100)
    public String description;

}
