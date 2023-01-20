package com.br.backend.reporitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.br.backend.DTO.ObjectPaginate;
import com.br.backend.model.ImgProduct;
import com.br.backend.model.Product;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CustomProductRepository {

	@Autowired
	private EntityManager entityManager;

	public Page<Product> findByCategory(Long categoryId, int offset) throws Exception {

		Query query = entityManager.createNativeQuery(
				"select tbl_product.id, tbl_product.name, tbl_product.price, tbl_imgproduct.url as imgProduct\r\n"
						+ "from tbl_product\r\n"
						+ "inner join tbl_imgproduct on tbl_imgproduct.product_id = tbl_product.id\r\n"
						+ "inner join tbl_category on tbl_product.category_id = tbl_category.id\r\n"
						+ "where tbl_category.id = ?");
		query.setParameter(1, categoryId);

		try {

			List<Object[]> objects = query.setMaxResults(10).setFirstResult(offset).getResultList();

			List<Product> products = new ArrayList<Product>();

			for (Object[] object : objects) {

				Product product = new Product().builder().id(Long.parseLong(object[0].toString()))
						.name(object[1].toString()).price(Double.valueOf(object[2].toString())).build();

				ImgProduct imgProduct = new ImgProduct().builder().url(object[3].toString()).build();

				product.setImage(imgProduct);

				products.add(product);

			}

			Page<Product> page = new PageImpl<Product>(products, PageRequest.of(0, 16), this.countAllElementsByCategory(categoryId));

			return page;

		} catch (Exception e) {
			throw new Exception(e);
		}

	}

	public Page<Product> findAllProductsPagination(int limit, int offset) throws Exception {

		Query query = entityManager.createNativeQuery(
				"select tbl_product.id, tbl_product.name, tbl_product.price, tbl_imgproduct.url as imgProduct\r\n"
						+ "from tbl_product\r\n"
						+ "inner join tbl_imgproduct on tbl_imgproduct.product_id = tbl_product.id\r\n"
						+ "inner join tbl_category on tbl_product.category_id = tbl_category.id order by id\r\n");

		try {

			List<Object[]> objects = query.setMaxResults(limit).setFirstResult(offset).getResultList();

			List<Product> products = new ArrayList<Product>();

			for (Object[] object : objects) {

				Product product = new Product().builder().id(Long.parseLong(object[0].toString()))
						.name(object[1].toString()).price(Double.valueOf(object[2].toString())).build();

				ImgProduct imgProduct = new ImgProduct().builder().url(object[3].toString()).build();

				product.setImage(imgProduct);

				products.add(product);

			}

			Page<Product> page = new PageImpl<Product>(products, PageRequest.of(0, limit), this.countAllElements());

			return page;

		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	public Page<Product> findProductByNameOrCategory(int limit, int offset, String name) throws Exception {

		Query query = entityManager.createNativeQuery(
				"select tbl_product.id, tbl_product.name, tbl_product.price, tbl_imgproduct.url as imgProduct\r\n"
						+ "from tbl_product\r\n"
						+ "inner join tbl_imgproduct on tbl_imgproduct.product_id = tbl_product.id\r\n"
						+ "inner join tbl_category on tbl_product.category_id = tbl_category.id\r\n"
						+ "where tbl_product.name like '" + name + "%' or tbl_category.name like'" + name + "%'");

		try {

			List<Object[]> objects = query.setMaxResults(limit).setFirstResult(offset).getResultList();

			List<Product> products = new ArrayList<Product>();

			for (Object[] object : objects) {

				Product product = new Product().builder().id(Long.parseLong(object[0].toString()))
						.name(object[1].toString()).price(Double.valueOf(object[2].toString())).build();

				ImgProduct imgProduct = new ImgProduct().builder().url(object[3].toString()).build();

				product.setImage(imgProduct);

				products.add(product);

			}

			Page<Product> page = new PageImpl<Product>(products, PageRequest.of(0, limit),
					this.countAllElementsByNameOrCategory(name));

			return page;

		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	public int countAllElementsByNameOrCategory(String name) {

		String total = entityManager.createNativeQuery("select count(1) from tbl_product inner join tbl_category\r\n"
				+ "on tbl_product.category_id = tbl_category.id where tbl_product.name like '" + name
				+ "%' or tbl_category.name like'" + name + "%'").getSingleResult().toString();

		return Integer.parseInt(total);

	}

	public int countAllElements() {

		String total = entityManager.createNativeQuery("select count(1) from tbl_product").getSingleResult().toString();

		return Integer.parseInt(total);

	}
	
	public int countAllElementsByCategory(Long categoryId) {

		String total = entityManager.createNativeQuery("select count(1) from tbl_product inner join tbl_category\r\n"
				+ "on tbl_product.category_id = tbl_category.id\r\n"
				+ "where tbl_category.id = "+categoryId+"").getSingleResult().toString();

		return Integer.parseInt(total);

	}

}
