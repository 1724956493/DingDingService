package com.nts.teststruts.model;
// Generated 2016-9-26 8:44:15 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * AdWztype generated by hbm2java
 */
@Entity
@Table(name = "AD_WZTYPE", schema = "NC58")
public class AdWztype implements java.io.Serializable {

	private String uuid;
	private String wzcode;
	private String wzname;
	private String wzparent;
	private String note;
	private Date createTime;
	private int type;
	private int dr;

	public AdWztype() {
	}

	public AdWztype(String uuid, String wzcode, String wzname, Date createTime) {
		this.uuid = uuid;
		this.wzcode = wzcode;
		this.wzname = wzname;
		this.createTime = createTime;
	}

	public AdWztype(String uuid, String wzcode, String wzname, String wzparent, String note, Date createTime,
			int type,int dr) {
		this.uuid = uuid;
		this.wzcode = wzcode; 
		this.wzname = wzname;
		this.wzparent = wzparent;
		this.note = note;
		this.createTime = createTime;
		this.type = type;
		this.dr = dr;
	}

	@Id
	@GeneratedValue(generator="system-uuid") 
	@GenericGenerator(name="system-uuid", strategy = "uuid") 
	@Column(name = "UUID", unique = true, nullable = false, length = 32)
	public String getUuid() {
		return this.uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	@Column(name = "WZCODE", nullable = false, length = 10)
	public String getWzcode() {
		return this.wzcode;
	}

	public void setWzcode(String wzcode) {
		this.wzcode = wzcode;
	}

	@Column(name = "WZNAME", nullable = false, length = 30)
	public String getWzname() {
		return this.wzname;
	}

	public void setWzname(String wzname) {
		this.wzname = wzname;
	}

	@Column(name = "WZPARENT", length = 32)
	public String getWzparent() {
		return this.wzparent;
	}

	public void setWzparent(String wzparent) {
		this.wzparent = wzparent;
	}

	@Column(name = "NOTE", length = 50)
	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATE_TIME", nullable = false, length = 7)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
	@Column(name = "TYPE", precision = 22, scale = 0)
	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	@Column(name = "DR", precision = 22, scale = 0)
	public int getDr() {
		return this.dr;
	}

	public void setDr(int dr) {
		this.dr = dr;
	}

}
