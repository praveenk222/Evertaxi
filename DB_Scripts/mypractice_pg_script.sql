-- Create a stored procedure named "example_procedure"
DROP FUNCTION usp_getallmemebers(bigint)
CREATE OR REPLACE FUNCTION usp_getallmemebers(param1 bigint)
RETURNS SETOF operation.member AS $$
    

begin
  -- do some work....
  
   SELECT * FROM operation.member  where userid= param1;
end;
$$ language plpgsql;


CREATE OR REPLACE  FUNCTION getfoo(int) RETURNS SETOF operation.member AS $$
    SELECT * FROM operation.member WHERE userid = $1;
$$ LANGUAGE SQL;

SELECT * FROM getfoo(1000) AS t1;

select * from usp_getallmemebers(1000);

CALL usp_getallmemebers(1000);

------------------Insert

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE OR REPLACE PROCEDURE Operation.usp_MemberInsert (
    p_UserID bigint,
    p_EmailID varchar(50),
    p_MobileNo varchar(20),
    p_Password varchar(20),
    p_FirstName varchar(50) = NULL,
    p_LastName varchar(50) = NULL,
    p_MemberType smallint,
    p_OTP varchar(10),
    p_IsOTPSent boolean,
    p_OTPSentDate timestamp(3) = NULL,
    p_IsResendOTP boolean = NULL,
    p_IsOTPVerified boolean = NULL,
    p_IsEmailVerified boolean = NULL,
    p_ProfilePhoto varchar(200) = NULL,
    p_ParentID bigint = NULL,
	p_IsRegisteredByMobile boolean,
	p_NewMemberID INOUT bigint)
	returns integer
	LANGUAGE plpgsql
AS $$ 
  

BEGIN
	
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
	INSERT INTO Operation.Member (
			EmailID, MobileNo, Password, FirstName, LastName, MemberType, OTP, IsOTPSent, OTPSentDate, IsResendOTP, 
			IsOTPVerified, IsEmailVerified, IsActive, CreatedOn, ProfilePhoto, ParentID,IsRegisteredByMobile)
	SELECT	p_EmailID, p_MobileNo, p_Password, p_FirstName, p_LastName, p_MemberType, p_OTP, p_IsOTPSent, p_OTPSentDate, p_IsResendOTP, 
			p_IsOTPVerified, p_IsEmailVerified, Cast(1 as boolean), now(), p_ProfilePhoto, p_ParentID,p_IsRegisteredByMobile;
	
	-- SQLINES LICENSE FOR EVALUATION USE ONLY
 p_NewMemberID := IDENT_CURRENT('[Operation].[Member]');
 return p_NewMemberID;
               
END;
$$ 
------------------Insert



---impt


CREATE OR REPLACE PROCEDURE Operation.usp_MemberLogin (      
p_EmailID varchar(50),     
p_MobileNo varchar(20),     
p_Password varchar(20),  
p_VendorID smallint,
ID int,
	message varchar(20)
) 
AS $$  



Declare v_UserID bigint = 0; 
 v_IsregWithMobTemp boolean = 0;
  v_NewToken char(36);
BEGIN  
If p_EmailID='' Then  p_EmailID:=NULL;
End if;  
If p_MobileNo='' 
THEN  
p_MobileNo := NULL;     
v_IsregWithMobTemp := 0; 
ELSE     
v_IsregWithMobTemp := 1;
End if;    

-- SQLINES LICENSE FOR EVALUATION USE ONLY
Select COALESCE(UserID,0) Into v_UserID From Operation.Member  Where  EmailID = COALESCE(p_EmailID,EmailID) And MobileNo = COALESCE(p_MobileNo,MobileNo) 
And IsRegisteredByMobile = cast(v_IsregWithMobTemp as boolean) And Password = p_Password 
and ParentID = case when p_VendorID=0 Then ParentID Else p_VendorID end; 

--RAISERROR('Invalid Email ID or Password!',16,1);
 IF v_UserID=0 THEN
        message := 'Invalid Email ID or Password!';
End if;     

 v_NewToken := NewID();      
UPDATE Operation.Member SET    Token= v_NewToken 
WHERE  UserID = v_UserID;  

--raise notice '%', 'userid : ' ||  cast(v_UserID as char(10));
-- SQLINES LICENSE FOR EVALUATION USE ONLY
 SELECT UserID, EmailID, MobileNo, Password, FirstName, LastName, MemberType, OTP, IsOTPSent,    OTPSentDate, IsResendOTP, IsOTPVerified, 
IsEmailVerified, IsActive, CreatedOn, ProfilePhoto,    Token, ParentID,IsRegisteredByMobile  
FROM Operation.Member WHERE   
UserID=v_UserID And ParentID = COALESCE(p_VendorID,0) 
And IsRegisteredByMobile = cast(v_IsregWithMobTemp as boolean);     
END;
$$ LANGUAGE plpgsql;  
------


----retunr table list using function---


CREATE OR REPLACE function f_getallmembers()
RETURNS Operation.Member
LANGUAGE sql
AS $BODY$
    SELECT * FROM Operation.Member;
$BODY$;
select * from f_getallmembers()
----retunr table only one record will return---

-------------------------to return multiple table values use this----
drop function f_getallmembers()
------------------------------------
CREATE OR REPLACE function f_getallmembers()
RETURNS SETOF Operation.Member
LANGUAGE sql
AS $BODY$
    SELECT * FROM Operation.Member;
$BODY$;
-------------------------to return multiple table values use this----

----------------return table wiht specified columns----

CREATE OR REPLACE function fn_getmembertable()
RETURNS TABLE
(
    userid bigint,
	emailid varchar(50),
	mobileno varchar(20)
)
LANGUAGE sql
AS $BODY$
    SELECT userid,emailid,mobileno FROM Operation.Member ;
$BODY$;
-------return table wiht specified columns----

CREATE OR REPLACE FUNCTION get_employees()
return Operation.Member;
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN SELECT * FROM Operation.Member
END;
$$;

------------login---

create or replace
function checkusername (
         p_EmailID varchar(50),     
p_MobileNo varchar(20),     
p_Password varchar(20) ,
result varchar default '0')     -- type and value to match returns declaration 
  returns varchar      
as $$
begin 
    if exists ( SELECT * 
			FROM Operation.Member WHERE     EmailID=p_EmailID 
                  and Password=p_Password and MobileNo=p_MobileNo
              )
    then                                    -- added 
        result = '1';                       -- added  's and ;
    else 
        result = '0';                       -- added  's and ;                                           
    end if;
    
    return result;                          -- added 
end;  
$$ language plpgsql;

-----Login----

---check Login User ---
--here we are checking login user usingmail and pass---
---main thing return type is table ------imp
create or replace function fn_Login( p_EmailID varchar(50),     
p_MobileNo varchar(20),     
p_Password varchar(20) )
returns table(id integer,status boolean, message text )
as $$
begin 
    if exists ( SELECT * 
				FROM Operation.Member
			    WHERE     EmailID=p_EmailID 
                  and   Password=p_Password 
              )
 	   then 
	   return query 
	   select 1 as id, true as status,'success' as message;
			 
	  -- added  's and ;
		else 
		return query 
	   select 0 as id, false as status,'wrong credentials' as message  ;                    -- added  's and ;                                           
		end if;
    
end;  
$$ language plpgsql;
-------------------------------------------------
-----List of all Procedures-----------



select * from fn_getmembertable()
select * from f_getallmembers()
select * from fn_getmembertable()
select * from fn_getallById(1000)

select * from fn_Login('prvn018@gmail.com',  '8519899222',     '12323' )
