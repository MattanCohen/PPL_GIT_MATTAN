
(define make-ok
  (lambda (val)
    (cons 0 val)
  )
 )
 
(define make-error
  (lambda (msg)
    (cons 1 msg)
  )
 )

(define ok?
  (lambda (res)
    (if (= (car res) 0) #t #f)
  )
 )

(define error?
  (lambda (res)
    (if (= (car res) 1) #t #f)
  )
 )

(define result?
  (lambda (res)
    (if (ok? res) #t 
      (if (error? res) #t
       (make-error "Value is not type result in result?") 
      )
    )
 )
)

(define result->val
  (lambda (res)
    (cdr res)
  )
)

(define bind 
  (lambda (f)
    @TODO
  )
)

(define make-dict
  (lambda ()
    @TODO
  )
)

(define dict?
  (lambda (e)
    @TODO
  )
)

(define get
  (lambda (dict k)
    @TODO
  )
)

(define put
  (lambda (dict k v)
    @TODO
  )
)

(define map-dict
  (lambda (dict f)
    @TODO
  )
)

(define filter-dict
  (lambda (dict pred)
    @TODO
  )
)
